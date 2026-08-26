import type * as ts from "typescript"
import * as luaStatements from "../../../LuaAST-statements"
import * as luaExpressions from "../../../LuaAST-expressions"
import type { FunctionVisitor } from "../../context/visitors"
import { forbiddenForIn } from "../../utils/diagnostics"
import { isArrayType } from "../../utils/typescript/typescript"
import { transformForInitializer, transformLoopBody } from "./utils"

export const transformForInStatement: FunctionVisitor<ts.ForInStatement> = (statement, context) => {
  if (isArrayType(context, context.checker.getTypeAtLocation(statement.expression))) {
    context.addDiagnostic(forbiddenForIn(statement))
  }

  const pairsIdentifier = luaExpressions.createIdentifier("pairs")
  const expression = context.transformExpression(statement.expression)
  const pairsCall = luaExpressions.createCallExpression(pairsIdentifier, [expression])

  const body = luaStatements.createBlock(transformLoopBody(context, statement))

  const valueVariable = transformForInitializer(context, statement.initializer, body)
  return luaStatements.createForInStatement(body, [valueVariable], [pairsCall], statement)
}
