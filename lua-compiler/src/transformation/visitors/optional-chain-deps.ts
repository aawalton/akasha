import type * as ts from "typescript"
import * as luaExpressions from "../../LuaAST-expressions"
import type { TransformationContext } from "../context/transformation-context"
import type { ExpressionWithThisValue } from "./this-value-capture"

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
