import { createHash } from "node:crypto"

const NAME = "carriedFile"

const LENGTH = "byteLength"

const DIGEST = "sha256"

const BODY = "base64"

const HELD = "json"

export type Carried = {
  readonly name: string
  readonly bytes: Uint8Array
}

export function digestOf(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex")
}

export function carrierFor(name: string, bytes: Uint8Array): string {
  const lines = [
    "{",
    `  "${NAME}": ${JSON.stringify(name)},`,
    `  "${LENGTH}": ${bytes.byteLength},`,
    `  "${DIGEST}": ${JSON.stringify(digestOf(bytes))},`,
    `  "${BODY}": ${JSON.stringify(Buffer.from(bytes).toString("base64"))}`,
    "}",
  ]
  return `${lines.join("\n")}\n`
}

function textAt(held: Record<string, unknown>, key: string, at: string): string {
  const said = held[key]
  if (typeof said !== "string") throw new Error(`${at} states no \`${key}\` a carried file needs`)
  return said
}

export function carriedIn(text: string, at: string): Carried {
  let held: unknown
  try {
    held = JSON.parse(text)
  } catch (thrown) {
    throw new Error(`${at} is no json, so nothing is carried in it — ${String(thrown)}`)
  }
  if (held === null || typeof held !== "object" || Array.isArray(held)) {
    throw new Error(`${at} carries no json object`)
  }
  const said = held as Record<string, unknown>
  const name = textAt(said, NAME, at)
  const digest = textAt(said, DIGEST, at)
  const bytes = new Uint8Array(Buffer.from(textAt(said, BODY, at), "base64"))
  const length = said[LENGTH]
  if (length !== bytes.byteLength) {
    throw new Error(`${at} says ${String(length)} bytes and carries ${bytes.byteLength}`)
  }
  if (digestOf(bytes) !== digest) {
    throw new Error(`${at} says its bytes are ${digest} and they are ${digestOf(bytes)}`)
  }
  return { name, bytes }
}

export function carrierAt(page: string, propertySlug: string): string {
  const stem = page.endsWith(".ts") ? page.slice(0, -".ts".length) : page
  return `${stem}.${propertySlug}.${HELD}`
}
