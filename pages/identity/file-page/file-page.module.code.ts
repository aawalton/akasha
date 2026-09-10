import { bytesOfHex, hexOf, sha1Bytes } from "../sha1-digest/sha1-digest.module.code.ts"

const AT_NAMESPACE = "6ba7b812-9dad-11d1-80b4-00c04fd430c8"

const MARKDOWN = ".md"

const DOT = "."

const UUID_BYTES = 16

const NAMESPACE = bytesOfHex(AT_NAMESPACE.replaceAll("-", ""))

const ENCODER = new TextEncoder()

export function fileStemOf(key: string): string {
  const base = key.slice(key.lastIndexOf("/") + 1)
  const dot = base.indexOf(DOT)
  return dot <= 0 ? base : base.slice(0, dot)
}

export function idDerivedFrom(at: string): string {
  const said = ENCODER.encode(at)
  const over = new Uint8Array(NAMESPACE.length + said.length)
  over.set(NAMESPACE)
  over.set(said, NAMESPACE.length)
  const bytes = sha1Bytes(over).subarray(0, UUID_BYTES)
  bytes[6] = ((bytes[6] ?? 0) & 0x0f) | 0x50
  bytes[8] = ((bytes[8] ?? 0) & 0x3f) | 0x80
  const hex = hexOf(bytes)
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`
}

export function idOfFilePage(stated: string | null, at: string): string {
  return stated ?? idDerivedFrom(at)
}

export function slugOfFilePage(stated: string | null, at: string | null): string | null {
  if (stated !== null) return stated
  if (at === null) return null
  const relPath = at.slice(at.indexOf(":") + 1)
  if (!relPath.endsWith(MARKDOWN)) return null
  const stem = relPath.split("/").pop() ?? relPath
  const named =
    stem.indexOf(".") <= 0 ? stem.slice(0, stem.length - MARKDOWN.length) : fileStemOf(stem)
  return named === "" ? null : named
}
