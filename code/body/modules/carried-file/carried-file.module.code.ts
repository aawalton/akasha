import { createHash } from "node:crypto"

const NAME = "carriedFile"

const LENGTH = "byteLength"

const DIGEST = "sha256"

const BODY = "base64"

export type Carried = {
  readonly name: string
  readonly bytes: Uint8Array
}

export function digestOf(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex")
}

function textAt(held: Record<string, unknown>, key: string, at: string): string {
  const said = held[key]
  if (typeof said !== "string") throw new Error(`${at} states no \`${key}\` a carried file needs`)
  return said
}

type CarriedSaid = {
  readonly name: string
  readonly digest: string
  readonly body: string
  readonly length: unknown
}

function parseCarriedSaid(held: unknown, at: string): CarriedSaid {
  if (held === null || typeof held !== "object" || Array.isArray(held)) {
    throw new Error(`${at} carries no json object`)
  }
  const said = held as Record<string, unknown>
  return {
    name: textAt(said, NAME, at),
    digest: textAt(said, DIGEST, at),
    body: textAt(said, BODY, at),
    length: said[LENGTH],
  }
}

function carriedSaidIn(text: string, at: string): CarriedSaid {
  try {
    return parseCarriedSaid(JSON.parse(text), at)
  } catch (thrown) {
    if (!(thrown instanceof SyntaxError)) throw thrown
    throw new Error(`${at} is no json, so nothing is carried in it — ${String(thrown)}`)
  }
}

export function carriedIn(text: string, at: string): Carried {
  const { name, digest, body, length } = carriedSaidIn(text, at)
  const bytes = new Uint8Array(Buffer.from(body, "base64"))
  if (length !== bytes.byteLength) {
    throw new Error(`${at} says ${String(length)} bytes and carries ${bytes.byteLength}`)
  }
  if (digestOf(bytes) !== digest) {
    throw new Error(`${at} says its bytes are ${digest} and they are ${digestOf(bytes)}`)
  }
  return { name, bytes }
}
