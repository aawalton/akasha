import { z } from "zod"

const DEFAULT_BASE_URL = "https://api.telnyx.com"

export interface TelnyxSendRequest {
  readonly url: string
  readonly method: "POST"
  readonly headers: Readonly<Record<string, string>>
  readonly body: string
}

interface BuildTelnyxSendArgs {
  readonly apiKey: string
  readonly from: string
  readonly to: string
  readonly text: string
  readonly baseUrl?: string
}

export function buildTelnyxSendRequest(args: BuildTelnyxSendArgs): TelnyxSendRequest {
  const baseUrl = args.baseUrl ?? DEFAULT_BASE_URL
  return {
    url: `${baseUrl}/v2/messages`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${args.apiKey}`,
    },
    body: JSON.stringify({ from: args.from, to: args.to, text: args.text }),
  }
}

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
