import { z } from "zod"

const ERROR_TYPE_ENVELOPE_SCHEMA = z.looseObject({ error: z.looseObject({ type: z.string() }) })

export function parseErrorType(bodyText: string): string | null {
  if (bodyText.length === 0) return null
  try {
    const body: unknown = JSON.parse(bodyText)
    if (typeof body !== "object" || body === null || !Object.hasOwn(body, "error")) return null
    const parsed = ERROR_TYPE_ENVELOPE_SCHEMA.safeParse(body)
    return parsed.success ? parsed.data.error.type : null
  } catch {
    return null
  }
}
