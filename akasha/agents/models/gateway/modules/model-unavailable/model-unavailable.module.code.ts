import { ANTHROPIC_ERROR_ENVELOPE_SCHEMA } from "../anthropic-error-envelope/anthropic-error-envelope.module.code.ts"

export const MODEL_UNAVAILABLE_STATUS = 404

export const NOT_FOUND_ERROR_TYPE = "not_found_error"

export type ModelUnavailableClassification = { matched: false } | { matched: true; reason: string }

export function classifyModelUnavailable(
  status: number,
  body: string
): ModelUnavailableClassification {
  if (status !== MODEL_UNAVAILABLE_STATUS) return { matched: false }
  let payload: unknown
  try {
    payload = JSON.parse(body)
  } catch {
    return { matched: false }
  }
  const parsed = ANTHROPIC_ERROR_ENVELOPE_SCHEMA.safeParse(payload)
  if (!parsed.success) return { matched: false }
  if (parsed.data.error.type !== NOT_FOUND_ERROR_TYPE) return { matched: false }
  return { matched: true, reason: parsed.data.error.message ?? NOT_FOUND_ERROR_TYPE }
}

export function isModelUnavailable(status: number, body: string): boolean {
  return classifyModelUnavailable(status, body).matched
}

export type ModelUnavailableAction =
  | { action: "mark-rebind" }
  | { action: "global-unmark"; firstAccount: string }

export function decideModelUnavailableAction(
  markedByReason: ReadonlyMap<string, string>,
  reason: string,
  currentAccount: string
): ModelUnavailableAction {
  const firstAccount = markedByReason.get(reason)
  if (firstAccount != null && firstAccount !== currentAccount) {
    return { action: "global-unmark", firstAccount }
  }
  return { action: "mark-rebind" }
}
