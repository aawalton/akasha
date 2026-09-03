import * as ts from "typescript"
import type { ExpressionLikeNode } from "../context-visitors/context-visitors.module.code.ts"
import type { OneToManyVisitorResult } from "../tstl-lua-ast/tstl-lua-ast.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import type * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import type * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"

function isLuaStatement(node: luaCore.Node): node is luaStatements.Statement {
  return (
    node.kind >= luaCore.SyntaxKind.DoStatement &&
    node.kind <= luaCore.SyntaxKind.ExpressionStatement
  )
}

function isLuaExpression(node: luaCore.Node): node is luaExpressions.Expression {
  return (
    node.kind >= luaCore.SyntaxKind.StringLiteral &&
    node.kind <= luaCore.SyntaxKind.ConditionalExpression
  )
}

export function assertAllStatements(
  tsNode: ts.Node,
  nodes: readonly luaCore.Node[]
): asserts nodes is luaStatements.Statement[] {
  for (const item of nodes) {
    if (!isLuaStatement(item)) {
      throw new Error(
        `Statement visitor for node type ${ts.SyntaxKind[tsNode.kind]} returned a non-statement node (${luaCore.SyntaxKindName[item.kind]}).`
      )
    }
  }
}

export function assertIsExpression(
  node: ExpressionLikeNode,
  result: OneToManyVisitorResult<luaCore.Node>
): luaExpressions.Expression {
  if (result === undefined) {
    throw new Error(
      `Expression visitor for node type ${ts.SyntaxKind[node.kind]} did not return any result.`
    )
  }
  const candidate = Array.isArray(result) ? result[0] : result
  if (candidate === undefined || !isLuaExpression(candidate)) {
    throw new Error(
      `Expression visitor for node type ${ts.SyntaxKind[node.kind]} returned a non-expression node (${candidate === undefined ? "empty array" : luaCore.SyntaxKindName[candidate.kind]}).`
    )
  }
  return candidate
}
