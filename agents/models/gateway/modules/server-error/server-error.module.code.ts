import {
  ANTHROPIC_ERROR_ENVELOPE_SCHEMA,
  type AnthropicError,
} from "../anthropic-error-envelope/anthropic-error-envelope.module.code.ts"

export const OVERLOADED_ERROR_TYPE = "overloaded_error"

export const OVERLOADED_STATUS = 529

export const RATE_LIMIT_STATUS = 429

export const SERVER_ERROR_BACKOFF_MS = [1000, 2000, 4000] as const

export const MAX_RETRY_AFTER_MS = 8000

export const OVERLOADED_REASON = "overloaded (529)"

const SERVER_ERROR_REASON: Readonly<Record<number, string>> = {
  500: "internal server error (500)",
  502: "bad gateway (502)",
  503: "service unavailable (503)",
}

export type ServerErrorClassification = { matched: false } | { matched: true; reason: string }

function parseEnvelope(body: string): AnthropicError | null {
  let payload: unknown
  try {
    payload = JSON.parse(body)
  } catch {
    return null
  }
  const parsed = ANTHROPIC_ERROR_ENVELOPE_SCHEMA.safeParse(payload)
  return parsed.success ? parsed.data.error : null
}

function parseEnvelopeMessage(body: string): string | null {
  return parseEnvelope(body)?.message ?? null
}

export function classifyServerError(status: number, body: string): ServerErrorClassification {
  if (status === OVERLOADED_STATUS) {
    return { matched: true, reason: parseEnvelopeMessage(body) ?? OVERLOADED_REASON }
  }
  const serverErrorReason = SERVER_ERROR_REASON[status]
  if (serverErrorReason != null) {
    return { matched: true, reason: parseEnvelopeMessage(body) ?? serverErrorReason }
  }
  if (status !== RATE_LIMIT_STATUS) return { matched: false }
  const envelope = parseEnvelope(body)
  if (envelope == null) return { matched: false }
  if (envelope.type !== OVERLOADED_ERROR_TYPE) return { matched: false }
  return { matched: true, reason: envelope.message ?? OVERLOADED_ERROR_TYPE }
}

export function isServerError(status: number, body: string): boolean {
  return classifyServerError(status, body).matched
}

function parseRetryAfterMs(header: string | null): number | null {
  if (header == null || header.trim() === "") return null
  const seconds = Number(header)
  if (!Number.isFinite(seconds) || seconds <= 0) return null
  return seconds * 1000
}

export function serverErrorBackoffMs(args: {
  retryAfterHeader: string | null
  attempt: number
  schedule: readonly number[]
}): number {
  const retryAfterMs = parseRetryAfterMs(args.retryAfterHeader)
  if (retryAfterMs != null) return Math.min(retryAfterMs, MAX_RETRY_AFTER_MS)
  const { schedule, attempt } = args
  if (schedule.length === 0) return 0
  return schedule[Math.min(attempt, schedule.length - 1)] ?? 0
}
