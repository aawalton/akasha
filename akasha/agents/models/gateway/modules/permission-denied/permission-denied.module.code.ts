import { ANTHROPIC_ERROR_ENVELOPE_SCHEMA } from "../anthropic-error-envelope/anthropic-error-envelope.module.code.ts"

export const PERMISSION_DENIED_STATUS = 403

export const PERMISSION_ERROR_TYPE = "permission_error"

export type PermissionDeniedClassification = { matched: false } | { matched: true; reason: string }

export function classifyPermissionDenied(
  status: number,
  body: string
): PermissionDeniedClassification {
  if (status !== PERMISSION_DENIED_STATUS) return { matched: false }
  let payload: unknown
  try {
    payload = JSON.parse(body)
  } catch {
    return { matched: false }
  }
  const parsed = ANTHROPIC_ERROR_ENVELOPE_SCHEMA.safeParse(payload)
  if (!parsed.success) return { matched: false }
  if (parsed.data.error.type !== PERMISSION_ERROR_TYPE) return { matched: false }
  return { matched: true, reason: parsed.data.error.message ?? PERMISSION_ERROR_TYPE }
}

export function isPermissionDenied(status: number, body: string): boolean {
  return classifyPermissionDenied(status, body).matched
}
