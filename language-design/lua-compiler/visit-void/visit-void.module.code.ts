import * as ts from "typescript"
import type { FunctionVisitor } from "../context-visitors/context-visitors.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import { wrapInStatement } from "../visit-expression-statement/visit-expression-statement.module.code.ts"

export const transformVoidExpression: FunctionVisitor<ts.VoidExpression> = (node, context) => {
  if (!ts.isLiteralExpression(node.expression)) {
    const statements = wrapInStatement(context.transformExpression(node.expression))
    if (statements) context.addPrecedingStatements(statements)
  }

  return luaExpressions.createNilLiteral()
}
