import { z } from "zod"

const telnyxNumberSchema = z.object({ phone_number: z.string() }).passthrough()

const telnyxMediaSchema = z
  .object({ url: z.string(), content_type: z.string().optional() })
  .passthrough()

export const telnyxWebhookSchema = z
  .object({
    data: z
      .object({
        event_type: z.string(),
        id: z.string(),
        payload: z
          .object({
            direction: z.string().optional(),
            id: z.string().optional(),
            from: telnyxNumberSchema,
            to: z.array(telnyxNumberSchema).optional(),
            text: z.string().optional(),
            type: z.string().optional(),
            media: z.array(telnyxMediaSchema).optional(),
          })
          .passthrough(),
      })
      .passthrough(),
  })
  .passthrough()

export type TelnyxWebhook = z.infer<typeof telnyxWebhookSchema>

export interface TelnyxInboundMedia {
  readonly url: string
  readonly contentType: string | null
}

export interface TelnyxInboundSms {
  readonly eventId: string
  readonly eventType: string
  readonly messageId: string | null
  readonly direction: string | null
  readonly fromNumber: string
  readonly toNumbers: readonly string[]
  readonly text: string
  readonly media: readonly TelnyxInboundMedia[]
}

export function extractInboundSms(webhook: TelnyxWebhook): TelnyxInboundSms {
  const { data } = webhook
  const { payload } = data
  return {
    eventId: data.id,
    eventType: data.event_type,
    messageId: payload.id ?? null,
    direction: payload.direction ?? null,
    fromNumber: payload.from.phone_number,
    toNumbers: (payload.to ?? []).map((t) => t.phone_number),
    text: payload.text ?? "",
    media: (payload.media ?? []).map((one) => ({
      url: one.url,
      contentType: one.content_type ?? null,
    })),
  }
}
