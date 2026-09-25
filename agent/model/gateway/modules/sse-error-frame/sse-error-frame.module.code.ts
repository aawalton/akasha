import { buildAnthropicErrorEnvelope } from "akasha/agent/model/gateway/modules/anthropic-error-envelope/anthropic-error-envelope.module.code.ts"

export function buildAnthropicSseErrorFrame(errorType: string, message: string): Uint8Array {
  const payload = JSON.stringify(buildAnthropicErrorEnvelope(errorType, message))
  return new TextEncoder().encode(`event: error\ndata: ${payload}\n\n`)
}
