import type * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"

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
