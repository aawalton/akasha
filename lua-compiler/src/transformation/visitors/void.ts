import * as ts from "typescript"
import * as luaExpressions from "../../LuaAST-expressions"
import type { FunctionVisitor } from "../context/visitors"
import { wrapInStatement } from "./expression-statement"

export const transformVoidExpression: FunctionVisitor<ts.VoidExpression> = (node, context) => {
  if (!ts.isLiteralExpression(node.expression)) {
    const statements = wrapInStatement(context.transformExpression(node.expression))
    if (statements) context.addPrecedingStatements(statements)
  }

  return luaExpressions.createNilLiteral()
}
