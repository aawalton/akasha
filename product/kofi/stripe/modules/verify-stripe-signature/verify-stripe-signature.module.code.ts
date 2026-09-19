export type StripeSignatureResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly reason: string }

export interface VerifyStripeSignatureArgs {
  readonly signingSecret: string
  readonly signatureHeader: string | null
  readonly rawBody: string
  readonly nowMs: number
  readonly toleranceSeconds?: number
}

const DEFAULT_TOLERANCE_SECONDS = 300

interface HeaderParts {
  readonly timestamp: string | null
  readonly signatures: readonly string[]
}

function partsOf(header: string): HeaderParts {
  let timestamp: string | null = null
  const signatures: string[] = []
  for (const pair of header.split(",")) {
    const at = pair.indexOf("=")
    if (at < 0) continue
    const key = pair.slice(0, at).trim()
    const value = pair.slice(at + 1).trim()
    if (key === "t") timestamp = value
    else if (key === "v1") signatures.push(value)
  }
  return { timestamp, signatures }
}

function hex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
}

function sameText(left: string, right: string): boolean {
  if (left.length !== right.length) return false
  let differing = 0
  for (let i = 0; i < left.length; i += 1) differing |= left.charCodeAt(i) ^ right.charCodeAt(i)
  return differing === 0
}

export async function verifyStripeSignature(
  args: VerifyStripeSignatureArgs
): Promise<StripeSignatureResult> {
  const { signingSecret, signatureHeader, rawBody, nowMs } = args
  const toleranceSeconds = args.toleranceSeconds ?? DEFAULT_TOLERANCE_SECONDS

  if (signingSecret.length === 0) return { ok: false, reason: "missing-secret" }
  if (signatureHeader === null || signatureHeader.length === 0) {
    return { ok: false, reason: "missing-signature" }
  }

  const { timestamp, signatures } = partsOf(signatureHeader)
  if (timestamp === null || timestamp.length === 0)
    return { ok: false, reason: "missing-timestamp" }
  if (signatures.length === 0) return { ok: false, reason: "missing-signature" }

  const tsSeconds = Number(timestamp)
  if (!Number.isFinite(tsSeconds)) return { ok: false, reason: "invalid-timestamp" }
  if (Math.abs(nowMs / 1000 - tsSeconds) > toleranceSeconds) {
    return { ok: false, reason: "stale-timestamp" }
  }

  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(signingSecret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    )
    const signed = await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(`${timestamp}.${rawBody}`)
    )
    const expected = hex(signed)
    return signatures.some((one) => sameText(one, expected))
      ? { ok: true }
      : { ok: false, reason: "signature-mismatch" }
  } catch {
    return { ok: false, reason: "verify-error" }
  }
}
