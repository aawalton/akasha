import * as ts from "typescript"
import * as luaStatements from "../../../LuaAST-statements"
import * as luaExpressions from "../../../LuaAST-expressions"
import { assert } from "../../../utils"
import type { TransformationContext } from "../../context/transformation-context"
import { invalidRangeControlVariable } from "../../utils/diagnostics"
import * as extensions from "../../utils/language-extensions"
import { getExtensionKindForNode } from "../../utils/language-extensions"
import { transformIdentifier } from "../identifier"
import { getVariableDeclarationBinding } from "../loops/utils"

export function isRangeFunction(
  context: TransformationContext,
  expression: ts.CallExpression
): boolean {
  return isRangeFunctionNode(context, expression.expression)
}

export function isRangeFunctionNode(context: TransformationContext, node: ts.Node): boolean {
  return (
    ts.isIdentifier(node) &&
    node.text === "$range" &&
    getExtensionKindForNode(context, node) === extensions.ExtensionKind.RangeFunction
  )
}

function getControlVariable(context: TransformationContext, statement: ts.ForOfStatement) {
  if (!ts.isVariableDeclarationList(statement.initializer)) {
    context.addDiagnostic(invalidRangeControlVariable(statement.initializer))
    return
  }

  const binding = getVariableDeclarationBinding(context, statement.initializer)
  if (!ts.isIdentifier(binding)) {
    context.addDiagnostic(invalidRangeControlVariable(statement.initializer))
    return
  }

  return transformIdentifier(context, binding)
}

export function transformRangeStatement(
  context: TransformationContext,
  statement: ts.ForOfStatement,
  block: luaStatements.Block
): luaStatements.Statement {
  assert(ts.isCallExpression(statement.expression))
  const controlVariable =
    getControlVariable(context, statement) ?? luaExpressions.createAnonymousIdentifier(statement.initializer)
  const [start = luaExpressions.createNumericLiteral(0), limit = luaExpressions.createNumericLiteral(0), step] =
    context.transformArguments(
      statement.expression.arguments,
      context.checker.getResolvedSignature(statement.expression)
    )
  return luaStatements.createForStatement(block, controlVariable, start, limit, step, statement)
}
