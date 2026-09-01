import { assertNever } from "@akasha/utils-narrow/assert-never"

export function isPerLevelBackfillTarget(level: number | null | undefined): level is number {
  return typeof level === "number" && Number.isInteger(level) && level >= 0
}

export function deriveRestoreResolution(dims: {
  readonly width: number
  readonly height: number
}): number {
  if (dims.width <= 0 || dims.height <= 0) {
    throw new Error(`deriveRestoreResolution: non-positive dimension ${dims.width}x${dims.height}`)
  }
  return Math.min(dims.width, dims.height)
}

export function planRetry(input: {
  readonly attempt: number
  readonly maxAttempts: number
  readonly baseDelayMs: number
  readonly maxDelayMs: number
}): { readonly retry: boolean; readonly delayMs: number } {
  if (input.attempt >= input.maxAttempts) return { retry: false, delayMs: 0 }
  const raw = input.baseDelayMs * 2 ** (input.attempt - 1)
  return { retry: true, delayMs: Math.min(input.maxDelayMs, raw) }
}

export type RestoreOutcome =
  | { readonly kind: "restored" }
  | { readonly kind: "retried"; readonly retries: number }
  | { readonly kind: "failed" }

export function classifyRestoreOutcome(input: {
  readonly succeeded: boolean
  readonly attempts: number
}): RestoreOutcome {
  if (!input.succeeded) return { kind: "failed" }
  if (input.attempts <= 1) return { kind: "restored" }
  return { kind: "retried", retries: input.attempts - 1 }
}

const PNG_SIGNATURE = [137, 80, 78, 71, 13, 10, 26, 10] as const

export function parsePngDimensions(bytes: Uint8Array): {
  readonly width: number
  readonly height: number
} {
  if (bytes.length < 24) {
    throw new Error("parsePngDimensions: buffer too short to hold a PNG IHDR")
  }
  for (let i = 0; i < PNG_SIGNATURE.length; i++) {
    if (bytes[i] !== PNG_SIGNATURE[i]) {
      throw new Error("parsePngDimensions: not a PNG (bad signature)")
    }
  }
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  return { width: view.getUint32(16, false), height: view.getUint32(20, false) }
}

export function formatRestoreOutcome(outcome: RestoreOutcome): string {
  switch (outcome.kind) {
    case "restored":
      return "restored"
    case "retried":
      return `retried-${outcome.retries}-times`
    case "failed":
      return "failed"
    default:
      return assertNever(outcome)
  }
}
