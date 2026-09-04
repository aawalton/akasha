import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import type { FunctionVisitor } from "../context-visitors/context-visitors.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { performHoisting, type Scope, ScopeType } from "../tstl-scope/tstl-scope.module.code.ts"

export function transformBlockOrStatement(
  context: TransformationContext,
  statement: ts.Statement
): readonly luaStatements.Statement[] {
  return context.transformStatements(ts.isBlock(statement) ? statement.statements : statement)
}

export function transformScopeBlock(
  context: TransformationContext,
  node: ts.Block,
  scopeType: ScopeType
): readonly [luaStatements.Block, Scope] {
  context.pushScope(scopeType, node)
  const statements = performHoisting(context, context.transformStatements(node.statements))
  const scope = context.popScope()
  return [luaStatements.createBlock(statements, node), scope]
}

export const transformBlock: FunctionVisitor<ts.Block> = (node, context) => {
  context.pushScope(ScopeType.Block, node)
  const statements = performHoisting(context, context.transformStatements(node.statements))
  context.popScope()
  return luaStatements.createDoStatement(statements, node)
}
