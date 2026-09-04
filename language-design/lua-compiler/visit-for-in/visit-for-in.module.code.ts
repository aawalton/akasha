import type * as ts from "typescript"
import type { FunctionVisitor } from "../context-visitors/context-visitors.module.code.ts"
import { forbiddenForIn } from "../tstl-diagnostics/tstl-diagnostics.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { isArrayType } from "../tstl-typescript/tstl-typescript.module.code.ts"
import {
  transformForInitializer,
  transformLoopBody,
} from "../visit-utils/visit-utils.module.code.ts"

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
