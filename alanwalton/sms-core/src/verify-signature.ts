export type SignatureResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly reason: string }

export interface VerifyTelnyxSignatureArgs {
  readonly publicKeyBase64: string
  readonly signatureBase64: string | null
  readonly timestamp: string | null
  readonly rawBody: string
  readonly nowMs: number
  readonly toleranceSeconds?: number
}

const DEFAULT_TOLERANCE_SECONDS = 300

function base64ToBytes(b64: string): Uint8Array<ArrayBuffer> {
  const binary = atob(b64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i)
  return bytes
}

export async function verifyTelnyxSignature(
  args: VerifyTelnyxSignatureArgs
): Promise<SignatureResult> {
  const { publicKeyBase64, signatureBase64, timestamp, rawBody, nowMs } = args
  const toleranceSeconds = args.toleranceSeconds ?? DEFAULT_TOLERANCE_SECONDS

  if (signatureBase64 === null || signatureBase64.length === 0) {
    return { ok: false, reason: "missing-signature" }
  }
  if (timestamp === null || timestamp.length === 0) {
    return { ok: false, reason: "missing-timestamp" }
  }

  const tsSeconds = Number(timestamp)
  if (!Number.isFinite(tsSeconds)) {
    return { ok: false, reason: "invalid-timestamp" }
  }
  const ageSeconds = Math.abs(nowMs / 1000 - tsSeconds)
  if (ageSeconds > toleranceSeconds) {
    return { ok: false, reason: "stale-timestamp" }
  }

  let publicKeyBytes: Uint8Array<ArrayBuffer>
  let signatureBytes: Uint8Array<ArrayBuffer>
  try {
    publicKeyBytes = base64ToBytes(publicKeyBase64)
    signatureBytes = base64ToBytes(signatureBase64)
  } catch {
    return { ok: false, reason: "invalid-base64" }
  }

  const message = new Uint8Array(new TextEncoder().encode(`${timestamp}|${rawBody}`))

  try {
    const key = await crypto.subtle.importKey("raw", publicKeyBytes, { name: "Ed25519" }, false, [
      "verify",
    ])
    const verified = await crypto.subtle.verify({ name: "Ed25519" }, key, signatureBytes, message)
    return verified ? { ok: true } : { ok: false, reason: "signature-mismatch" }
  } catch {
    return { ok: false, reason: "verify-error" }
  }
}
