import type { FunctionVisitor } from "akasha/design/language/lua-compiler/context-visitors/context-visitors.module.code.ts"
import * as luaExpressions from "akasha/design/language/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import { wrapInStatement } from "akasha/design/language/lua-compiler/visit-expression-statement/visit-expression-statement.module.code.ts"
import * as ts from "typescript"

export const transformVoidExpression: FunctionVisitor<ts.VoidExpression> = (node, context) => {
  if (!ts.isLiteralExpression(node.expression)) {
    const statements = wrapInStatement(context.transformExpression(node.expression))
    if (statements) context.addPrecedingStatements(statements)
  }

  return luaExpressions.createNilLiteral()
}
