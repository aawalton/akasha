import { ANTHROPIC_ERROR_ENVELOPE_SCHEMA } from "akasha/agent/model/gateway/modules/anthropic-error-envelope/anthropic-error-envelope.module.code.ts"

export const MODEL_UNAVAILABLE_STATUS = 404

export const NOT_FOUND_ERROR_TYPE = "not_found_error"

export type ModelUnavailableClassification = { matched: false } | { matched: true; reason: string }

export function classifyModelUnavailable(
  status: number,
  body: string
): ModelUnavailableClassification {
  if (status !== MODEL_UNAVAILABLE_STATUS) return { matched: false }
  try {
    const parsed = ANTHROPIC_ERROR_ENVELOPE_SCHEMA.safeParse(JSON.parse(body))
    if (!parsed.success) return { matched: false }
    if (parsed.data.error.type !== NOT_FOUND_ERROR_TYPE) return { matched: false }
    const message = parsed.data.error.message
    return {
      matched: true,
      reason: message == null || message === "" ? NOT_FOUND_ERROR_TYPE : message,
    }
  } catch {
    return { matched: false }
  }
}
