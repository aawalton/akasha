import { z } from "zod"

const STREAM_FLAG_SCHEMA = z.looseObject({ stream: z.boolean().optional() })

export function parseClientStreamFlag(bodyBuffer: ArrayBuffer | null): boolean {
  if (bodyBuffer == null) return false
  try {
    const text = new TextDecoder().decode(bodyBuffer)
    const parsed = STREAM_FLAG_SCHEMA.safeParse(JSON.parse(text))
    return parsed.success && parsed.data.stream === true
  } catch {
    return false
  }
}
