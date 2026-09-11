import type { TransformationContext } from "akasha/design/language/lua-compiler/context-transformation-context/context-transformation-context.module.code.ts"
import type * as luaExpressions from "akasha/design/language/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import type * as luaStatements from "akasha/design/language/lua-compiler/lua-ast-statements/lua-ast-statements.module.code.ts"

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
