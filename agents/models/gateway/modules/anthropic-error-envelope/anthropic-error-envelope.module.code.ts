import { z } from "zod"

export const ANTHROPIC_ERROR_ENVELOPE_SCHEMA = z.looseObject({
  type: z.literal("error"),
  error: z.looseObject({
    type: z.string(),
    message: z.string().optional(),
  }),
})

export type AnthropicErrorEnvelope = z.infer<typeof ANTHROPIC_ERROR_ENVELOPE_SCHEMA>

export type AnthropicError = AnthropicErrorEnvelope["error"]

export function parseAnthropicErrorEnvelope(body: string): AnthropicError | null {
  let payload: unknown
  try {
    payload = JSON.parse(body)
  } catch {
    return null
  }
  const parsed = ANTHROPIC_ERROR_ENVELOPE_SCHEMA.safeParse(payload)
  return parsed.success ? parsed.data.error : null
}
