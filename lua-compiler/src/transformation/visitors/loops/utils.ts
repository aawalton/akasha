import * as ts from "typescript"
import * as luaCore from "../../../LuaAST-core"
import * as luaStatements from "../../../LuaAST-statements"
import * as luaExpressions from "../../../LuaAST-expressions"
import type { TransformationContext } from "../../context/transformation-context"
import { transformInPrecedingStatementScope } from "../../utils/preceding-statements"
import { LoopContinued, performHoisting, ScopeType } from "../../utils/scope"
import { isAssignmentPattern } from "../../utils/typescript/nodes"
import { transformAssignment } from "../binary-expression/assignments"
import { transformAssignmentPattern } from "../binary-expression/destructuring-assignments"
import { transformBlockOrStatement } from "../block"
import { transformIdentifier } from "../identifier"
import { checkVariableDeclarationList, transformBindingPattern } from "../variable-declaration"

export function transformLoopBody(
  context: TransformationContext,
  loop:
    | ts.WhileStatement
    | ts.DoStatement
    | ts.ForStatement
    | ts.ForOfStatement
    | ts.ForInOrOfStatement
): readonly luaStatements.Statement[] {
  context.pushScope(ScopeType.Loop, loop)
  const body = performHoisting(context, transformBlockOrStatement(context, loop.statement))
  const scope = context.popScope()
  const scopeId = scope.id

  switch (scope.loopContinued) {
    case undefined:
    case LoopContinued.WithContinue:
      return body

    case LoopContinued.WithGoto:
      return [luaStatements.createDoStatement(body), luaStatements.createLabelStatement(`__continue${scopeId}`)]

    case LoopContinued.WithRepeatBreak: {
      const identifier = luaExpressions.createIdentifier(`__continue${scopeId}`)
      const literalTrue = luaExpressions.createBooleanLiteral(true)

      const transformedBodyStatements = []
      let bodyBroken = false
      for (const statement of body) {
        transformedBodyStatements.push(statement)
        if (luaStatements.isBreakStatement(statement)) {
          bodyBroken = true
          break
        }
      }
      if (!bodyBroken) {
        transformedBodyStatements.push(luaStatements.createAssignmentStatement(identifier, literalTrue))
      }

      return [
        luaStatements.createDoStatement([
          luaStatements.createVariableDeclarationStatement(identifier),
          luaStatements.createRepeatStatement(luaStatements.createBlock(transformedBodyStatements), literalTrue),
          luaStatements.createIfStatement(
            luaExpressions.createUnaryExpression(identifier, luaCore.SyntaxKind.NotOperator),
            luaStatements.createBlock([luaStatements.createBreakStatement()])
          ),
        ]),
      ]
    }
  }
}

export function getVariableDeclarationBinding(
  context: TransformationContext,
  node: ts.VariableDeclarationList
): ts.BindingName {
  checkVariableDeclarationList(context, node)

  const [firstDecl] = node.declarations
  if (firstDecl === undefined) {
    return ts.factory.createIdentifier("____")
  }

  return firstDecl.name
}

export function transformForInitializer(
  context: TransformationContext,
  initializer: ts.ForInitializer,
  block: luaStatements.Block
): luaExpressions.Identifier {
  const valueVariable = luaExpressions.createIdentifier("____value")

  context.pushScope(ScopeType.LoopInitializer, initializer)

  if (ts.isVariableDeclarationList(initializer)) {

    const binding = getVariableDeclarationBinding(context, initializer)
    if (ts.isArrayBindingPattern(binding) || ts.isObjectBindingPattern(binding)) {
      const { precedingStatements, result: bindings } = transformInPrecedingStatementScope(
        context,
        () => transformBindingPattern(context, binding, valueVariable)
      )
      block.statements = [...precedingStatements, ...bindings, ...block.statements]
    } else {
      context.popScope()
      return transformIdentifier(context, binding)
    }
  } else {

    const newStatements: readonly luaStatements.Statement[] = isAssignmentPattern(initializer)
      ? transformAssignmentPattern(context, initializer, valueVariable, false)
      : transformAssignment(context, initializer, valueVariable)
    block.statements = [...newStatements, ...block.statements]
  }

  context.popScope()
  return valueVariable
}

export function invertCondition(expression: luaExpressions.Expression) {
  if (luaExpressions.isUnaryExpression(expression) && expression.operator === luaCore.SyntaxKind.NotOperator) {
    return expression.operand
  } else {
    const notExpression = luaExpressions.createUnaryExpression(expression, luaCore.SyntaxKind.NotOperator)
    luaCore.setNodePosition(notExpression, luaCore.getOriginalPos(expression))
    return notExpression
  }
}
