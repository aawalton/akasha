import { z } from "zod"

const telnyxSendResponseSchema = z
  .object({
    data: z
      .object({
        id: z.string(),
        direction: z.string().optional(),
        type: z.string().optional(),
      })
      .passthrough(),
  })
  .passthrough()

type ParsedSendResponse =
  | { readonly ok: true; readonly id: string }
  | { readonly ok: false; readonly reason: string }

export function parseTelnyxSendResponse(raw: unknown): ParsedSendResponse {
  const parsed = telnyxSendResponseSchema.safeParse(raw)
  if (!parsed.success) return { ok: false, reason: "invalid-send-response" }
  return { ok: true, id: parsed.data.data.id }
}
