import type { ExpressionLikeNode } from "akasha/design/language/lua-compiler/modules/context-visitors/context-visitors.module.code.ts"
import type { OneToManyVisitorResult } from "akasha/design/language/lua-compiler/modules/lua-ast/lua-ast.module.code.ts"
import * as luaCore from "akasha/design/language/lua-compiler/modules/lua-ast-core/lua-ast-core.module.code.ts"
import type * as luaExpressions from "akasha/design/language/lua-compiler/modules/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import type * as luaStatements from "akasha/design/language/lua-compiler/modules/lua-ast-statements/lua-ast-statements.module.code.ts"
import * as ts from "typescript"

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
        `Statement visitor for node type ${ts.SyntaxKind[tsNode.kind]} returned a non-statement node (${luaCore.SYNTAX_KIND_NAME[item.kind]}).`
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
      `Expression visitor for node type ${ts.SyntaxKind[node.kind]} returned a non-expression node (${candidate === undefined ? "empty array" : luaCore.SYNTAX_KIND_NAME[candidate.kind]}).`
    )
  }
  return candidate
}
