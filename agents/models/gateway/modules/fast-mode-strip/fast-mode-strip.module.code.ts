import { z } from "zod"

export const FAST_MODE_BETA_PREFIX = "fast-mode-"

export const FAST_SPEED = "fast"

export const ANTHROPIC_BETA_HEADER = "anthropic-beta"

const SPEED_REQUEST_SCHEMA = z.looseObject({ speed: z.string().optional() })

function parseBody(bodyBuffer: ArrayBuffer): z.infer<typeof SPEED_REQUEST_SCHEMA> | null {
  let parsed: ReturnType<typeof SPEED_REQUEST_SCHEMA.safeParse>
  try {
    parsed = SPEED_REQUEST_SCHEMA.safeParse(JSON.parse(new TextDecoder().decode(bodyBuffer)))
  } catch {
    return null
  }
  return parsed.success ? parsed.data : null
}

function encodeToArrayBuffer(text: string): ArrayBuffer {
  const encoded = new TextEncoder().encode(text)
  const out = new ArrayBuffer(encoded.byteLength)
  new Uint8Array(out).set(encoded)
  return out
}

export function isFastModeBody(bodyBuffer: ArrayBuffer | null): boolean {
  if (bodyBuffer == null) return false
  return parseBody(bodyBuffer)?.speed === FAST_SPEED
}

export function hasFastModeBeta(betaHeader: string | null): boolean {
  if (betaHeader == null) return false
  return betaHeader.split(",").some((token) => token.trim().startsWith(FAST_MODE_BETA_PREFIX))
}

export function requestsFastMode(
  bodyBuffer: ArrayBuffer | null,
  betaHeader: string | null
): boolean {
  return isFastModeBody(bodyBuffer) || hasFastModeBeta(betaHeader)
}

export function stripSpeedFromBody(bodyBuffer: ArrayBuffer): ArrayBuffer | null {
  const body = parseBody(bodyBuffer)
  if (body == null) return null
  if (body.speed == null) return null
  const rest = { ...body }
  delete rest.speed
  return encodeToArrayBuffer(JSON.stringify(rest))
}

export function stripFastModeBeta(betaHeader: string | null): string | null {
  if (betaHeader == null) return null
  const tokens = betaHeader.split(",").map((token) => token.trim())
  const filled = tokens.filter((token) => token !== "")
  const kept = filled.filter((token) => !token.startsWith(FAST_MODE_BETA_PREFIX))
  if (kept.length === filled.length) return null
  return kept.join(",")
}

export type FastModeStrip = {
  readonly body: ArrayBuffer | null
  readonly headers: Headers
}

export function stripFastMode(args: {
  bodyBuffer: ArrayBuffer | null
  headers: Headers
}): FastModeStrip | null {
  const { bodyBuffer, headers } = args
  const strippedBody = bodyBuffer == null ? null : stripSpeedFromBody(bodyBuffer)
  const strippedBeta = stripFastModeBeta(headers.get(ANTHROPIC_BETA_HEADER))
  if (strippedBody == null && strippedBeta == null) return null

  const out = new Headers(headers)
  if (strippedBeta != null) {
    if (strippedBeta === "") out.delete(ANTHROPIC_BETA_HEADER)
    else out.set(ANTHROPIC_BETA_HEADER, strippedBeta)
  }
  return { body: strippedBody ?? bodyBuffer, headers: out }
}
