import type { TransformationContext } from "akasha/design/language/lua-compiler/context-transformation-context/context-transformation-context.module.code.ts"
import type * as ts from "typescript"

export type IsOptimizedVarArgSpreadFn = (
  context: TransformationContext,
  symbol: ts.Symbol,
  identifier: ts.Identifier
) => boolean | undefined

export const isOptimizedVarArgSpreadHolder: {
  fn: IsOptimizedVarArgSpreadFn | undefined
} = {
  fn: undefined,
}

export function requireIsOptimizedVarArgSpread(): IsOptimizedVarArgSpreadFn {
  if (isOptimizedVarArgSpreadHolder.fn === undefined) {
    throw new Error(
      "utils/symbols: isOptimizedVarArgSpread not registered — visitors/spread must load before trackSymbolReference is called"
    )
  }
  return isOptimizedVarArgSpreadHolder.fn
}
