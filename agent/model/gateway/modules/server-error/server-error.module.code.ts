import { parseAnthropicErrorEnvelope } from "akasha/agent/model/gateway/modules/anthropic-error-envelope/anthropic-error-envelope.module.code.ts"

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

function saidOrNull(message: string | null | undefined): string | null {
  return message == null || message === "" ? null : message
}

function parseEnvelopeMessage(body: string): string | null {
  return saidOrNull(parseAnthropicErrorEnvelope(body)?.message)
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
  const envelope = parseAnthropicErrorEnvelope(body)
  if (envelope == null) return { matched: false }
  if (envelope.type !== OVERLOADED_ERROR_TYPE) return { matched: false }
  return { matched: true, reason: saidOrNull(envelope.message) ?? OVERLOADED_ERROR_TYPE }
}

function untilDateMs(header: string, now: number): number | null {
  const at = Date.parse(header)
  if (!Number.isFinite(at)) return null
  const ms = at - now
  return ms > 0 ? ms : null
}

export function parseRetryAfterMs(header: string | null, now: number = Date.now()): number | null {
  if (header == null || header.trim() === "") return null
  const seconds = Number(header)
  if (Number.isNaN(seconds)) return untilDateMs(header, now)
  if (!Number.isFinite(seconds) || seconds <= 0) return null
  return seconds * 1000
}

export function serverErrorBackoffMs(args: {
  retryAfterHeader: string | null
  attempt: number
  schedule: readonly number[]
  now?: number
}): number {
  const retryAfterMs = parseRetryAfterMs(args.retryAfterHeader, args.now)
  if (retryAfterMs != null) return Math.min(retryAfterMs, MAX_RETRY_AFTER_MS)
  const { schedule, attempt } = args
  if (schedule.length === 0) return 0
  const index = Math.min(Math.max(0, Math.floor(attempt)), schedule.length - 1)
  return schedule[index] ?? 0
}
