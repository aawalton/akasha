import { z } from "zod"

export const FABLE_MODEL_PREFIX = "claude-fable-"

const MODEL_REQUEST_SCHEMA = z.looseObject({ model: z.string().optional() })

function parseBody(bodyBuffer: ArrayBuffer): z.infer<typeof MODEL_REQUEST_SCHEMA> | null {
  try {
    const text = new TextDecoder().decode(bodyBuffer)
    const parsed = MODEL_REQUEST_SCHEMA.safeParse(JSON.parse(text))
    return parsed.success ? parsed.data : null
  } catch {
    return null
  }
}

export function isFableRequest(bodyBuffer: ArrayBuffer | null): boolean {
  if (bodyBuffer == null) return false
  const model = parseBody(bodyBuffer)?.model
  return model?.startsWith(FABLE_MODEL_PREFIX) === true
}
