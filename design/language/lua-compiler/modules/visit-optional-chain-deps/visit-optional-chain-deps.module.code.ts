import type { TransformationContext } from "akasha/design/language/lua-compiler/modules/context-transformation-context/context-transformation-context.module.code.ts"
import type * as luaExpressions from "akasha/design/language/lua-compiler/modules/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import type { ExpressionWithThisValue } from "akasha/design/language/lua-compiler/modules/visit-this-value-capture/visit-this-value-capture.module.code.ts"
import type * as ts from "typescript"

export type TransformOptionalChainWithCaptureFn = (
  context: TransformationContext,
  tsNode: ts.OptionalChain,
  thisValueCapture: luaExpressions.Identifier | undefined,
  isDelete?: ts.DeleteExpression
) => ExpressionWithThisValue

export const TRANSFORM_OPTIONAL_CHAIN_WITH_CAPTURE_HOLDER: {
  fn: TransformOptionalChainWithCaptureFn | undefined
} = {
  fn: undefined,
}

export function requireTransformOptionalChainWithCapture(): TransformOptionalChainWithCaptureFn {
  if (TRANSFORM_OPTIONAL_CHAIN_WITH_CAPTURE_HOLDER.fn === undefined) {
    throw new Error(
      "visitors/access: transformOptionalChainWithCapture not registered — visitors/optional-chaining must load before transform*AccessExpressionWithCapture is called"
    )
  }
  return TRANSFORM_OPTIONAL_CHAIN_WITH_CAPTURE_HOLDER.fn
}
