import * as luaStatements from "../../LuaAST-statements"
import * as luaExpressions from "../../LuaAST-expressions"
import type { TransformationContext } from "../context/transformation-context"

export interface WithPrecedingStatements<
  T extends luaStatements.Statement | readonly luaStatements.Statement[] | luaExpressions.Expression | readonly luaExpressions.Expression[],
> {
  precedingStatements: readonly luaStatements.Statement[]
  result: T
}

export function transformInPrecedingStatementScope<
  TReturn extends luaStatements.Statement | readonly luaStatements.Statement[] | luaExpressions.Expression | readonly luaExpressions.Expression[],
>(context: TransformationContext, transformer: () => TReturn): WithPrecedingStatements<TReturn> {
  context.pushPrecedingStatements()
  const statementOrStatements = transformer()
  const precedingStatements = context.popPrecedingStatements()
  return { precedingStatements, result: statementOrStatements }
}
