import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import {
  invalidMultiIterableWithoutDestructuring,
  invalidPairsIterableWithoutDestructuring,
} from "../tstl-diagnostics/tstl-diagnostics.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { isReferenceType } from "../tstl-typescript/tstl-typescript.module.code.ts"
import { cast } from "../tstl-utils/tstl-utils.module.code.ts"
import { isMultiReturnType } from "../visit-extension-multi/visit-extension-multi.module.code.ts"
import {
  getVariableDeclarationBinding,
  transformForInitializer,
} from "../visit-utils/visit-utils.module.code.ts"
import { transformArrayBindingElement } from "../visit-variable-declaration/visit-variable-declaration.module.code.ts"

function transformForOfMultiIterableStatement(
  context: TransformationContext,
  statement: ts.ForOfStatement,
  block: luaStatements.Block,
  luaIterator: luaExpressions.Expression,
  invalidMultiUseDiagnostic: (node: ts.Node) => ts.Diagnostic
): luaStatements.Statement {
  context.pushPrecedingStatements()
  let identifiers: luaExpressions.Identifier[] = []

  if (ts.isVariableDeclarationList(statement.initializer)) {
    const binding = getVariableDeclarationBinding(context, statement.initializer)
    if (ts.isArrayBindingPattern(binding)) {
      identifiers = binding.elements.map((e) => transformArrayBindingElement(context, e))
    } else {
      context.addDiagnostic(invalidMultiUseDiagnostic(binding))
    }
  } else if (ts.isArrayLiteralExpression(statement.initializer)) {
    identifiers = statement.initializer.elements.map((_, i) =>
      luaExpressions.createIdentifier(`____value${i}`)
    )
    if (identifiers.length > 0) {
      block.statements = [
        luaStatements.createAssignmentStatement(
          statement.initializer.elements.map((e) =>
            cast(context.transformExpression(e), luaExpressions.isAssignmentLeftHandSideExpression)
          ),
          identifiers
        ),
        ...block.statements,
      ]
    }
  } else {
    context.addDiagnostic(invalidMultiUseDiagnostic(statement.initializer))
  }

  if (identifiers.length === 0) {
    identifiers.push(luaExpressions.createAnonymousIdentifier())
  }

  block.statements = [...context.popPrecedingStatements(), ...block.statements]

  return luaStatements.createForInStatement(block, identifiers, [luaIterator], statement)
}

export function transformForOfIterableStatement(
  context: TransformationContext,
  statement: ts.ForOfStatement,
  block: luaStatements.Block
): luaStatements.Statement {
  const iteratedExpressionType = context.checker.getTypeAtLocation(statement.expression)
  const iterableType =
    iteratedExpressionType.isIntersection() &&
    iteratedExpressionType.types.find((t) => t.symbol.escapedName === "Iterable")
  const iterableTypeArguments = iterableType
    ? cast(iterableType, isReferenceType).typeArguments
    : undefined

  const firstTypeArg = iterableTypeArguments?.[0]
  if (iterableTypeArguments && firstTypeArg !== undefined && isMultiReturnType(firstTypeArg)) {
    const luaIterator = context.transformExpression(statement.expression)
    return transformForOfMultiIterableStatement(
      context,
      statement,
      block,
      luaIterator,
      invalidMultiIterableWithoutDestructuring
    )
  }

  const luaIterator = context.transformExpression(statement.expression)
  const identifier = transformForInitializer(context, statement.initializer, block)
  return luaStatements.createForInStatement(block, [identifier], [luaIterator], statement)
}

export function transformForOfPairsIterableStatement(
  context: TransformationContext,
  statement: ts.ForOfStatement,
  block: luaStatements.Block
): luaStatements.Statement {
  const pairsCall = luaExpressions.createCallExpression(luaExpressions.createIdentifier("pairs"), [
    context.transformExpression(statement.expression),
  ])
  return transformForOfMultiIterableStatement(
    context,
    statement,
    block,
    pairsCall,
    invalidPairsIterableWithoutDestructuring
  )
}

export function transformForOfPairsKeyIterableStatement(
  context: TransformationContext,
  statement: ts.ForOfStatement,
  block: luaStatements.Block
): luaStatements.Statement {
  const pairsCall = luaExpressions.createCallExpression(luaExpressions.createIdentifier("pairs"), [
    context.transformExpression(statement.expression),
  ])
  const identifier = transformForInitializer(context, statement.initializer, block)
  return luaStatements.createForInStatement(block, [identifier], [pairsCall], statement)
}
