import type * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import {
  ExtensionKind,
  getBinaryCallExtensionArgs,
  getExtensionKindForNode,
  getNaryCallExtensionArgs,
  getUnaryCallExtensionArg,
} from "../tstl-language-extensions/tstl-language-extensions.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { assert } from "../tstl-utils/tstl-utils.module.code.ts"
import type { LanguageExtensionCallTransformerMap } from "../visit-extension-call-extension/visit-extension-call-extension.module.code.ts"

export function isTableNewCall(context: TransformationContext, node: ts.NewExpression) {
  return getExtensionKindForNode(context, node.expression) === ExtensionKind.TableNewType
}

export const tableNewExtensions = [ExtensionKind.TableNewType]

export const tableExtensionTransformers: LanguageExtensionCallTransformerMap = {
  [ExtensionKind.TableDeleteType]: transformTableDeleteExpression,
  [ExtensionKind.TableDeleteMethodType]: transformTableDeleteExpression,
  [ExtensionKind.TableGetType]: transformTableGetExpression,
  [ExtensionKind.TableGetMethodType]: transformTableGetExpression,
  [ExtensionKind.TableHasType]: transformTableHasExpression,
  [ExtensionKind.TableHasMethodType]: transformTableHasExpression,
  [ExtensionKind.TableSetType]: transformTableSetExpression,
  [ExtensionKind.TableSetMethodType]: transformTableSetExpression,
  [ExtensionKind.TableAddKeyType]: transformTableAddKeyExpression,
  [ExtensionKind.TableAddKeyMethodType]: transformTableAddKeyExpression,
  [ExtensionKind.TableIsEmptyType]: transformTableIsEmptyExpression,
  [ExtensionKind.TableIsEmptyMethodType]: transformTableIsEmptyExpression,
}

function transformTableDeleteExpression(
  context: TransformationContext,
  node: ts.CallExpression,
  extensionKind: ExtensionKind
): luaExpressions.Expression {
  const args = getBinaryCallExtensionArgs(context, node, extensionKind)
  if (!args) {
    return luaExpressions.createNilLiteral()
  }

  const [table, key] = context.transformOrderedExpressions(args)
  assert(table !== undefined && key !== undefined)
  context.addPrecedingStatements(
    luaStatements.createAssignmentStatement(
      luaExpressions.createTableIndexExpression(table, key),
      luaExpressions.createNilLiteral(),
      node
    )
  )
  return luaExpressions.createBooleanLiteral(true)
}

function transformTableGetExpression(
  context: TransformationContext,
  node: ts.CallExpression,
  extensionKind: ExtensionKind
): luaExpressions.Expression {
  const args = getBinaryCallExtensionArgs(context, node, extensionKind)
  if (!args) {
    return luaExpressions.createNilLiteral()
  }

  const [table, key] = context.transformOrderedExpressions(args)
  assert(table !== undefined && key !== undefined)
  return luaExpressions.createTableIndexExpression(table, key, node)
}

function transformTableHasExpression(
  context: TransformationContext,
  node: ts.CallExpression,
  extensionKind: ExtensionKind
): luaExpressions.Expression {
  const args = getBinaryCallExtensionArgs(context, node, extensionKind)
  if (!args) {
    return luaExpressions.createNilLiteral()
  }

  const [table, key] = context.transformOrderedExpressions(args)
  assert(table !== undefined && key !== undefined)
  const tableIndexExpression = luaExpressions.createTableIndexExpression(table, key)

  return luaExpressions.createBinaryExpression(
    tableIndexExpression,
    luaExpressions.createNilLiteral(),
    luaCore.SyntaxKind.InequalityOperator,
    node
  )
}

function transformTableSetExpression(
  context: TransformationContext,
  node: ts.CallExpression,
  extensionKind: ExtensionKind
): luaExpressions.Expression {
  const args = getNaryCallExtensionArgs(context, node, extensionKind, 3)
  if (!args) {
    return luaExpressions.createNilLiteral()
  }

  const [table, key, value] = context.transformOrderedExpressions(args)
  assert(table !== undefined && key !== undefined && value !== undefined)
  context.addPrecedingStatements(
    luaStatements.createAssignmentStatement(
      luaExpressions.createTableIndexExpression(table, key),
      value,
      node
    )
  )
  return luaExpressions.createNilLiteral()
}

function transformTableAddKeyExpression(
  context: TransformationContext,
  node: ts.CallExpression,
  extensionKind: ExtensionKind
): luaExpressions.Expression {
  const args = getNaryCallExtensionArgs(context, node, extensionKind, 2)
  if (!args) {
    return luaExpressions.createNilLiteral()
  }

  const [table, key] = context.transformOrderedExpressions(args)
  assert(table !== undefined && key !== undefined)
  context.addPrecedingStatements(
    luaStatements.createAssignmentStatement(
      luaExpressions.createTableIndexExpression(table, key),
      luaExpressions.createBooleanLiteral(true),
      node
    )
  )
  return luaExpressions.createNilLiteral()
}

function transformTableIsEmptyExpression(
  context: TransformationContext,
  node: ts.CallExpression,
  extensionKind: ExtensionKind
): luaExpressions.Expression {
  const args = getUnaryCallExtensionArg(context, node, extensionKind)
  if (!args) {
    return luaExpressions.createNilLiteral()
  }

  const table = context.transformExpression(args)
  return luaExpressions.createBinaryExpression(
    luaExpressions.createCallExpression(luaExpressions.createIdentifier("next"), [table], node),
    luaExpressions.createNilLiteral(),
    luaCore.SyntaxKind.EqualityOperator,
    node
  )
}
