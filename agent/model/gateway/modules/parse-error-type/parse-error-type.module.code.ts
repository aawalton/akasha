import { z } from "zod"

const ERROR_BODY_SCHEMA = z.record(z.string(), z.unknown())

const ERROR_TYPE_ENVELOPE_SCHEMA = z.looseObject({ error: z.looseObject({ type: z.string() }) })

export function parseErrorType(bodyText: string): string | null {
  if (bodyText.length === 0) return null
  try {
    const body = ERROR_BODY_SCHEMA.parse(JSON.parse(bodyText))
    if (!Object.hasOwn(body, "error")) return null
    const parsed = ERROR_TYPE_ENVELOPE_SCHEMA.safeParse(body)
    return parsed.success ? parsed.data.error.type : null
  } catch {
    return null
  }
}
