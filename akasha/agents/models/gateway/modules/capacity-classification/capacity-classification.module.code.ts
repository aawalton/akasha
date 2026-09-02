export const FIVE_HOUR_STATUS_HEADER = "anthropic-ratelimit-unified-5h-status"
export const SEVEN_DAY_STATUS_HEADER = "anthropic-ratelimit-unified-7d-status"
export const OVERAGE_STATUS_HEADER = "anthropic-ratelimit-unified-overage-status"
export const OVERAGE_DISABLED_REASON_HEADER = "anthropic-ratelimit-unified-overage-disabled-reason"

export const STATUS_ALLOWED = "allowed"

export const STATUS_REJECTED = "rejected"

export const FAST_MODE_CREDITS_MESSAGE = "usage credits are required for fast mode"

export type NotCapacitySignal = "windows-allowed" | "overage-header" | "overage-body"

export type Capacity429Class =
  | { readonly kind: "capacity"; readonly reason: string }
  | {
      readonly kind: "not-capacity"
      readonly signal: NotCapacitySignal
      readonly overageRejected: boolean
      readonly overageDisabledReason: string | null
      readonly reason: string
    }
  | { readonly kind: "unclassified"; readonly reason: string }

function readHeader(headers: Headers, name: string): string | null {
  const raw = headers.get(name)
  if (raw == null) return null
  const trimmed = raw.trim().toLowerCase()
  return trimmed === "" ? null : trimmed
}

export function classifyCapacity429(headers: Headers, bodyText: string | null): Capacity429Class {
  const fiveHour = readHeader(headers, FIVE_HOUR_STATUS_HEADER)
  const sevenDay = readHeader(headers, SEVEN_DAY_STATUS_HEADER)
  const overageDisabledReason = readHeader(headers, OVERAGE_DISABLED_REASON_HEADER)

  if (fiveHour == null || sevenDay == null) {
    const bothAbsent = fiveHour == null && sevenDay == null
    if (bothAbsent && overageDisabledReason != null) {
      return {
        kind: "not-capacity",
        signal: "overage-header",
        overageRejected: true,
        overageDisabledReason,
        reason: `windows absent, ${OVERAGE_DISABLED_REASON_HEADER}=${overageDisabledReason} — overage refusal, says nothing about capacity`,
      }
    }
    const bodyNamesFastModeCredits = (bodyText ?? "")
      .toLowerCase()
      .includes(FAST_MODE_CREDITS_MESSAGE)
    if (bothAbsent && bodyNamesFastModeCredits) {
      return {
        kind: "not-capacity",
        signal: "overage-body",
        overageRejected: true,
        overageDisabledReason: null,
        reason: "windows absent, body names fast-mode credits — overage refusal (weak body match)",
      }
    }
    const missing = [
      fiveHour == null ? FIVE_HOUR_STATUS_HEADER : null,
      sevenDay == null ? SEVEN_DAY_STATUS_HEADER : null,
    ]
      .filter((header): header is string => header != null)
      .join(", ")
    return { kind: "unclassified", reason: `window status header(s) absent: ${missing}` }
  }

  if (fiveHour !== STATUS_ALLOWED || sevenDay !== STATUS_ALLOWED) {
    return { kind: "capacity", reason: `5h=${fiveHour} 7d=${sevenDay}` }
  }

  const overage = readHeader(headers, OVERAGE_STATUS_HEADER)
  const overageRejected = overage === STATUS_REJECTED
  const detail = overageRejected
    ? `overage=${STATUS_REJECTED}${
        overageDisabledReason == null ? "" : ` (${overageDisabledReason})`
      }`
    : `overage=${overage ?? "absent"}`
  return {
    kind: "not-capacity",
    signal: "windows-allowed",
    overageRejected,
    overageDisabledReason,
    reason: `5h=${STATUS_ALLOWED} 7d=${STATUS_ALLOWED} ${detail}`,
  }
}
