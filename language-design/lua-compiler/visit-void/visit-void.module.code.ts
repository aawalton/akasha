import type { FunctionVisitor } from "akasha/language-design/lua-compiler/context-visitors/context-visitors.module.code.ts"
import * as luaExpressions from "akasha/language-design/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import { wrapInStatement } from "akasha/language-design/lua-compiler/visit-expression-statement/visit-expression-statement.module.code.ts"
import * as ts from "typescript"

export const transformVoidExpression: FunctionVisitor<ts.VoidExpression> = (node, context) => {
  if (!ts.isLiteralExpression(node.expression)) {
    const statements = wrapInStatement(context.transformExpression(node.expression))
    if (statements) context.addPrecedingStatements(statements)
  }

  return luaExpressions.createNilLiteral()
}
