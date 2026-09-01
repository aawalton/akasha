import { createHash } from "node:crypto"

const AT_NAMESPACE = "6ba7b812-9dad-11d1-80b4-00c04fd430c8"

const MARKDOWN = ".md"

const DOT = "."

export function fileStemOf(key: string): string {
  const base = key.slice(key.lastIndexOf("/") + 1)
  const dot = base.indexOf(DOT)
  return dot <= 0 ? base : base.slice(0, dot)
}

export function idDerivedFrom(at: string): string {
  const namespace = Buffer.from(AT_NAMESPACE.replaceAll("-", ""), "hex")
  const digest = createHash("sha1").update(namespace).update(at, "utf8").digest()
  const bytes = Uint8Array.from(digest.subarray(0, 16))
  bytes[6] = ((bytes[6] ?? 0) & 0x0f) | 0x50
  bytes[8] = ((bytes[8] ?? 0) & 0x3f) | 0x80
  const hex = Buffer.from(bytes).toString("hex")
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
