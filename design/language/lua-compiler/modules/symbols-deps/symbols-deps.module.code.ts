import type { TransformationContext } from "akasha/design/language/lua-compiler/modules/context-transformation-context/context-transformation-context.module.code.ts"
import type * as ts from "typescript"

export type IsOptimizedVarArgSpreadFn = (
  context: TransformationContext,
  symbol: ts.Symbol,
  identifier: ts.Identifier
) => boolean | undefined

export const IS_OPTIMIZED_VAR_ARG_SPREAD_HOLDER: {
  fn: IsOptimizedVarArgSpreadFn | undefined
} = {
  fn: undefined,
}

export function requireIsOptimizedVarArgSpread(): IsOptimizedVarArgSpreadFn {
  if (IS_OPTIMIZED_VAR_ARG_SPREAD_HOLDER.fn === undefined) {
    throw new Error(
      "utils/symbols: isOptimizedVarArgSpread not registered — visitors/spread must load before trackSymbolReference is called"
    )
  }
  return IS_OPTIMIZED_VAR_ARG_SPREAD_HOLDER.fn
}
