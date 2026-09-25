import { ANTHROPIC_ERROR_ENVELOPE_SCHEMA } from "akasha/agent/model/gateway/modules/anthropic-error-envelope/anthropic-error-envelope.module.code.ts"

export const PERMISSION_DENIED_STATUS = 403

export const PERMISSION_ERROR_TYPE = "permission_error"

export type PermissionDeniedClassification = { matched: false } | { matched: true; reason: string }

export function classifyPermissionDenied(
  status: number,
  body: string
): PermissionDeniedClassification {
  if (status !== PERMISSION_DENIED_STATUS) return { matched: false }
  try {
    const parsed = ANTHROPIC_ERROR_ENVELOPE_SCHEMA.safeParse(JSON.parse(body))
    if (!parsed.success) return { matched: false }
    if (parsed.data.error.type !== PERMISSION_ERROR_TYPE) return { matched: false }
    const message = parsed.data.error.message
    return {
      matched: true,
      reason: message == null || message === "" ? PERMISSION_ERROR_TYPE : message,
    }
  } catch {
    return { matched: false }
  }
}
