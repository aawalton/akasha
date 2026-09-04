import type * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import type * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import type { ExpressionWithThisValue } from "../visit-this-value-capture/visit-this-value-capture.module.code.ts"

export type TransformOptionalChainWithCaptureFn = (
  context: TransformationContext,
  tsNode: ts.OptionalChain,
  thisValueCapture: luaExpressions.Identifier | undefined,
  isDelete?: ts.DeleteExpression
) => ExpressionWithThisValue

export const transformOptionalChainWithCaptureHolder: {
  fn: TransformOptionalChainWithCaptureFn | undefined
} = {
  fn: undefined,
}

export function requireTransformOptionalChainWithCapture(): TransformOptionalChainWithCaptureFn {
  if (transformOptionalChainWithCaptureHolder.fn === undefined) {
    throw new Error(
      "visitors/access: transformOptionalChainWithCapture not registered — visitors/optional-chaining must load before transform*AccessExpressionWithCapture is called"
    )
  }
  return transformOptionalChainWithCaptureHolder.fn
}
