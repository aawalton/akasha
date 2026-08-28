import type { Dirent } from "node:fs"
import { readdirSync, readFileSync } from "node:fs"
import { parse } from "yaml"
import { pageTypeOf } from "../page-type/page-type.ts"

export type Stated = Readonly<Record<string, unknown>>

export type Parts = {
  readonly stated: Stated
  readonly body: string
}

const SKIPPED: ReadonlySet<string> = new Set([".git", "node_modules"])

const OPENS = "---\n"
const CLOSES = "\n---"

const BREAK = "\n"

const PAGE = ".md"

const isMissing = (thrown: unknown): boolean => {
  const code = (thrown as { readonly code?: unknown } | null)?.code
  return code === "ENOENT" || code === "ENOTDIR"
}

const unlisted = (dir: string, why: unknown): string =>
  `cannot be listed: ${dir}: ${why instanceof Error ? why.message : String(why)}`

const entriesIn = (dir: string): readonly Dirent[] | string => {
  try {
    return readdirSync(dir, { withFileTypes: true })
  } catch (why) {
    return unlisted(dir, why)
  }
}

const walked = (
  root: string,
  keep: (kind: string) => boolean,
  found: Map<string, string[]>
): string | null => {
  const walk = (at: string): string | null => {
    const entries = entriesIn(at === "" ? root : `${root}/${at}`)
    if (typeof entries === "string") return entries
    for (const entry of entries) {
      if (entry.isSymbolicLink()) continue
      const under = at === "" ? entry.name : `${at}/${entry.name}`
      if (entry.isDirectory()) {
        if (SKIPPED.has(entry.name)) continue
        const why = walk(under)
        if (why !== null) return why
        continue
      }
      const kind = pageTypeOf(entry.name)
      if (kind === null || !keep(kind)) continue
      const held = found.get(kind)
      if (held === undefined) found.set(kind, [under])
      else held.push(under)
    }
    return null
  }
  return walk("")
}

export const pagesUnder = (
  root: string,
  kinds: ReadonlySet<string>
): ReadonlyMap<string, readonly string[]> | string => {
  const found = new Map<string, string[]>()
  for (const kind of kinds) found.set(kind, [])
  const why = walked(root, (kind) => kinds.has(kind), found)
  return why === null ? found : why
}

export const everyPageUnder = (root: string): ReadonlyMap<string, readonly string[]> | string => {
  const found = new Map<string, string[]>()
  const why = walked(root, () => true, found)
  return why === null ? found : why
}

export const partsIn = (text: string): Parts | string => {
  if (!text.startsWith(OPENS)) return "states nothing: it opens with no frontmatter"
  const closes = text.indexOf(CLOSES, OPENS.length)
  if (closes < 0) return "states nothing: its frontmatter is opened and never closed"
  let held: unknown
  try {
    held = parse(text.slice(OPENS.length, closes + 1))
  } catch (why) {
    return `states nothing readable: ${why instanceof Error ? why.message : String(why)}`
  }
  if (held === null || typeof held !== "object" || Array.isArray(held)) {
    return "states nothing readable: its frontmatter is not a set of keys"
  }
  const rest = text.slice(closes + CLOSES.length)
  return {
    stated: held as Stated,
    body: rest.startsWith(BREAK) ? rest.slice(BREAK.length) : rest,
  }
}

export const statedAt = (root: string, at: string): Stated | string => {
  let text: string
  try {
    text = readFileSync(`${root}/${at}`, "utf8")
  } catch (why) {
    return `cannot be read: ${why instanceof Error ? why.message : String(why)}`
  }
  const parts = partsIn(text)
  return typeof parts === "string" ? parts : parts.stated
}

const quoted = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

const stemOf = (at: string): string => (at.endsWith(PAGE) ? at.slice(0, -PAGE.length) : at)

export const sidecarsOf = (root: string, at: string, key: string): readonly string[] | string => {
  const stem = stemOf(at)
  const cut = stem.lastIndexOf("/")
  const dir = cut < 0 ? "" : stem.slice(0, cut)
  const base = `${cut < 0 ? stem : stem.slice(cut + 1)}.${key}`
  const named = new RegExp(`^${quoted(base)}(?:\\.part(\\d+))?(\\.uncommitted)?\\.jsonl$`)
  const entries = entriesIn(dir === "" ? root : `${root}/${dir}`)
  if (typeof entries === "string") return entries
  const found: { readonly at: string; readonly part: number; readonly late: number }[] = []
  for (const entry of entries) {
    if (!entry.isFile()) continue
    const held = named.exec(entry.name)
    if (held === null) continue
    found.push({
      at: dir === "" ? entry.name : `${dir}/${entry.name}`,
      part: held[1] === undefined ? 1 : Number(held[1]),
      late: held[2] === undefined ? 0 : 1,
    })
  }
  found.sort((one, other) => one.late - other.late || one.part - other.part)
  return found.map((one) => one.at)
}

export const besideOf = (root: string, at: string): readonly string[] | string => {
  const stem = stemOf(at)
  const cut = stem.lastIndexOf("/")
  const dir = cut < 0 ? "" : stem.slice(0, cut)
  const base = `${cut < 0 ? stem : stem.slice(cut + 1)}.`
  const entries = entriesIn(dir === "" ? root : `${root}/${dir}`)
  if (typeof entries === "string") return entries
  const found: string[] = []
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.startsWith(base)) continue
    const under = dir === "" ? entry.name : `${dir}/${entry.name}`
    if (under !== at) found.push(under)
  }
  return found.sort()
}

export const textAt = (root: string, at: string): string | null => {
  try {
    return readFileSync(`${root}/${at}`, "utf8")
  } catch (why) {
    if (isMissing(why)) return null
    throw why
  }
}
