import type { TransformationContext } from "akasha/design/language/lua-compiler/context-transformation-context/context-transformation-context.module.code.ts"
import * as extensions from "akasha/design/language/lua-compiler/language-extension-kinds/language-extension-kinds.module.code.ts"
import { getExtensionKindForNode } from "akasha/design/language/lua-compiler/language-extension-kinds/language-extension-kinds.module.code.ts"
import * as luaExpressions from "akasha/design/language/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import * as luaStatements from "akasha/design/language/lua-compiler/lua-ast-statements/lua-ast-statements.module.code.ts"
import { invalidRangeControlVariable } from "akasha/design/language/lua-compiler/transform-diagnostics/transform-diagnostics.module.code.ts"
import { assert } from "akasha/design/language/lua-compiler/utils/utils.module.code.ts"
import { transformIdentifier } from "akasha/design/language/lua-compiler/visit-identifier/visit-identifier.module.code.ts"
import { getVariableDeclarationBinding } from "akasha/design/language/lua-compiler/visit-utils/visit-utils.module.code.ts"
import * as ts from "typescript"

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
    getControlVariable(context, statement) ??
    luaExpressions.createAnonymousIdentifier(statement.initializer)
  const [
    start = luaExpressions.createNumericLiteral(0),
    limit = luaExpressions.createNumericLiteral(0),
    step,
  ] = context.transformArguments(
    statement.expression.arguments,
    context.checker.getResolvedSignature(statement.expression)
  )
  return luaStatements.createForStatement(block, controlVariable, start, limit, step, statement)
}
