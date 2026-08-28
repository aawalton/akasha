import { createHash } from "node:crypto"
import type { Frontmatter } from "../../frontmatter.ts"
import { blockOf, stringAt } from "../../text/text.ts"
import { fileStemOf } from "../name.ts"
import { filledBy, pageStem } from "../../../named-for/named-for.ts"

const AT_NAMESPACE = "6ba7b812-9dad-11d1-80b4-00c04fd430c8"

const MARKDOWN = ".md"

export const NAMED_FOR = "named-for"

export const EXTENDS_SLUG = "extends-slug"

const NONE = "none"

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
  const named = stem.indexOf(".") <= 0 ? stem.slice(0, stem.length - MARKDOWN.length) : fileStemOf(stem)
  return named === "" ? null : named
}

export type PageTypeNaming = {
  readonly namedFor: string | null
  readonly above: string | null
}

function slugPart(named: string | null): string | null {
  if (named === null || named === NONE) return null
  const cut = named.indexOf("/")
  return cut < 0 ? named : named.slice(cut + 1)
}

export function namingOf(text: string): PageTypeNaming | null {
  const { fm, why } = blockOf(text)
  if (why !== null) return null
  return { namedFor: stringAt(fm, NAMED_FOR), above: slugPart(stringAt(fm, EXTENDS_SLUG)) }
}

export function ruleFor(
  naming: ReadonlyMap<string, PageTypeNaming>,
  type: string
): string | null {
  const walked = new Set<string>()
  let at: string | null = type
  while (at !== null && !walked.has(at)) {
    walked.add(at)
    const held = naming.get(at)
    if (held === undefined) return null
    if (held.namedFor !== null) return held.namedFor
    at = held.above
  }
  return null
}

export function filled(rule: string, fm: Frontmatter): string | null {
  return filledBy(rule, (key) => stringAt(fm, key))
}

export type Named = {
  readonly name: string
  readonly via: string
}

export function nameOf(rule: string | null, fm: Frontmatter): Named | null {
  if (rule !== null) {
    const held = filled(rule, fm)
    if (held !== null) return { name: held, via: NAMED_FOR }
  }
  const slug = stringAt(fm, "slug")
  if (slug !== null) return { name: slug, via: "slug" }
  const title = stringAt(fm, "title")
  if (title !== null) return { name: pageStem(title), via: "title" }
  const id = stringAt(fm, "id")
  if (id !== null) return { name: id, via: "id" }
  return null
}
