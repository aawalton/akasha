import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import type * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import type * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"

export interface WithPrecedingStatements<
  T extends
    | luaStatements.Statement
    | readonly luaStatements.Statement[]
    | luaExpressions.Expression
    | readonly luaExpressions.Expression[],
> {
  precedingStatements: readonly luaStatements.Statement[]
  result: T
}

export function transformInPrecedingStatementScope<
  TReturn extends
    | luaStatements.Statement
    | readonly luaStatements.Statement[]
    | luaExpressions.Expression
    | readonly luaExpressions.Expression[],
>(context: TransformationContext, transformer: () => TReturn): WithPrecedingStatements<TReturn> {
  context.pushPrecedingStatements()
  const statementOrStatements = transformer()
  const precedingStatements = context.popPrecedingStatements()
  return { precedingStatements, result: statementOrStatements }
}
