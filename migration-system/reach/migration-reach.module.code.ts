import { readFileSync } from "node:fs"
import { told } from "@akasha/git/git-running"
import { lowerUuid } from "@akasha/pages-system/name-format/lower-uuid"

const NOTHING_TRACKED =
  "git listed no tracked file at all under the root swept, so every path would read as unreached " +
  "for a reason that is not about the files judged"

const TAIL = 8

const FRONT = "---"

const DECLARING = '^\\s*(id|slug|pageTypeSlug)\\s*:\\s*"'

const DECLARED = /^\s*(id|slug|pageTypeSlug)\s*:\s*"([^"]+)"/

const FILED = /^\s*([A-Za-z][A-Za-z0-9_-]*)\s*:\s*"?([^"#]*?)"?\s*$/

const IDENTITY: ReadonlySet<string> = new Set(["id", "slug", "page-type-slug", "pageTypeSlug"])

const FIELD = 6

const FIELDS = 6

const HEAD = 16384

export type Inside = {
  readonly path: string
  readonly id: string | null
  readonly slug: string | null
  readonly pageTypeSlug: string | null
}

export type Reaching = {
  readonly root: string
  readonly at: string
  readonly pages: readonly Inside[]
  readonly byId: ReadonlyMap<string, string>
  readonly byTail: ReadonlyMap<string, readonly string[]>
  readonly byName: ReadonlyMap<string, readonly string[]>
  readonly byBlob: ReadonlyMap<string, readonly string[]>
  readonly byType: ReadonlyMap<string, number>
  readonly held: ReadonlySet<string>
  readonly bodyOf: (path: string) => string
}

export type Stated = {
  readonly path: string
  readonly there: boolean
  readonly id: string | null
  readonly slug: string | null
  readonly pageTypeSlug: string | null
  readonly blob: string | null
  readonly fields: readonly string[]
}

export type Told = ReadonlyMap<string, string>

export type Held = {
  readonly kind: "identity" | "body" | "name" | "told" | "tail" | "absent"
  readonly at: string
  readonly said: string
}

export type Reach =
  | { readonly reached: true; readonly path: string; readonly held: readonly Held[] }
  | {
      readonly reached: false
      readonly path: string
      readonly why: string
      readonly weak: readonly Held[]
    }

export function tailOf(id: string): string {
  return id.slice(-TAIL)
}

export function nameOf(pageTypeSlug: string, slug: string): string {
  return `${pageTypeSlug}/${slug}`
}

function pushed(held: Map<string, string[]>, key: string, at: string): undefined {
  const found = held.get(key)
  if (found === undefined) {
    held.set(key, [at])
    return
  }
  found.push(at)
}

export function declaredIn(lines: readonly string[]): readonly Inside[] {
  const held = new Map<
    string,
    { id: string | null; slug: string | null; pageTypeSlug: string | null }
  >()
  for (const line of lines) {
    const mark = line.indexOf(":")
    if (mark === -1) continue
    const path = line.slice(0, mark)
    const said = DECLARED.exec(line.slice(mark + 1))
    if (said === null) continue
    const found = held.get(path) ?? { id: null, slug: null, pageTypeSlug: null }
    const key = said[1]
    const value = said[2] ?? ""
    if (key === "id") found.id = value
    if (key === "slug") found.slug = value
    if (key === "pageTypeSlug") found.pageTypeSlug = value
    held.set(path, found)
  }
  return [...held].map(([path, one]) => ({ path, ...one }))
}

export function blobsIn(lines: readonly string[]): ReadonlyMap<string, readonly string[]> {
  const held = new Map<string, string[]>()
  for (const line of lines) {
    const mark = line.indexOf("\t")
    if (mark === -1) continue
    const parts = line.slice(0, mark).split(" ")
    const blob = parts[1]
    if (blob === undefined) continue
    pushed(held, blob, line.slice(mark + 1))
  }
  return held
}

function linesOf(said: string | null): readonly string[] {
  if (said === null) return []
  return said.split("\n").filter((one) => one !== "")
}

export function reachingIn(root: string): Reaching {
  const at = told(root, ["rev-parse", "HEAD"])?.trim() ?? ""
  const named = told(root, ["grep", "-I", "-E", DECLARING, "--"])
  const pages = declaredIn(linesOf(named))
  const byId = new Map<string, string>()
  const byTail = new Map<string, string[]>()
  const byName = new Map<string, string[]>()
  const byType = new Map<string, number>()
  const held = new Set<string>()
  for (const one of pages) {
    held.add(one.path)
    if (one.id !== null) {
      if (!byId.has(one.id)) byId.set(one.id, one.path)
      pushed(byTail, tailOf(one.id), one.path)
    }
    if (one.pageTypeSlug !== null) {
      byType.set(one.pageTypeSlug, (byType.get(one.pageTypeSlug) ?? 0) + 1)
    }
    if (one.slug !== null && one.pageTypeSlug !== null) {
      pushed(byName, nameOf(one.pageTypeSlug, one.slug), one.path)
    }
  }
  const staged = linesOf(told(root, ["ls-files", "-s", "--"]))
  if (staged.length === 0) throw new Error(NOTHING_TRACKED)
  const byBlob = blobsIn(staged)
  for (const paths of byBlob.values()) for (const one of paths) held.add(one)
  const bodyOf = (path: string): string => bodyIn(root, path)
  return { root, at, pages, byId, byTail, byName, byBlob, byType, held, bodyOf }
}

export function fieldWorth(value: string): boolean {
  if (value.length < FIELD) return false
  if (/^[0-9.]+$/.test(value)) return false
  return value !== "true" && value !== "false" && value !== "null"
}

export function statedOf(path: string, text: string): Omit<Stated, "blob" | "there"> {
  const held: { id: string | null; slug: string | null; pageTypeSlug: string | null } = {
    id: null,
    slug: null,
    pageTypeSlug: null,
  }
  const fields: string[] = []
  const lines = text.split("\n")
  const front = lines[0]?.trim() === FRONT
  for (const [at, line] of lines.entries()) {
    if (front && at > 0 && line.trim() === FRONT) break
    const said = front ? FILED.exec(line) : DECLARED.exec(line)
    if (said === null) continue
    const key = said[1] ?? ""
    const value = (said[2] ?? "").trim()
    if (key === "id") held.id = value
    else if (key === "slug") held.slug = value
    else if (key === "pageTypeSlug" || key === "page-type-slug") held.pageTypeSlug = value
    if (IDENTITY.has(key) || !fieldWorth(value) || fields.length >= FIELDS) continue
    fields.push(value)
  }
  return { path, ...held, fields }
}

export function statedIn(root: string, paths: readonly string[]): readonly Stated[] {
  const staged = blobsIn(linesOf(told(root, ["ls-files", "-s", "--", ...paths])))
  const blobOf = new Map<string, string>()
  for (const [blob, held] of staged) for (const one of held) blobOf.set(one, blob)
  return paths.map((path) => {
    let text = ""
    try {
      text = readFileSync(`${root}/${path}`, "utf8").slice(0, HEAD)
    } catch {
      text = ""
    }
    return { ...statedOf(path, text), there: text !== "", blob: blobOf.get(path) ?? null }
  })
}

const ABSENT = "no file is there to judge, so this says nothing about content"

const NO_NAME = "this file names no page type of its own, so no counterpart could be looked for"

const NO_TYPE = "akasha carries no page at all of page type"

const REGROUPED =
  "— this folder may have been regrouped at another grain rather than left behind, so look for the content under another page type before migrating it again"

const bodies = new Map<string, string>()

export function bodyIn(root: string, path: string): string {
  const found = bodies.get(path)
  if (found !== undefined) return found
  let text = ""
  try {
    text = readFileSync(`${root}/${path}`, "utf8")
  } catch {
    text = ""
  }
  bodies.set(path, text)
  return text
}

export function fieldFound(
  bodyOf: (path: string) => string,
  at: string,
  fields: readonly string[]
): string | null {
  if (fields.length === 0) return null
  const text = bodyOf(at)
  if (text === "") return null
  for (const one of fields) if (text.includes(one)) return one
  return null
}

export function regroupedIn(root: string, stated: Stated): readonly string[] {
  const one = stated.fields[0]
  if (one === undefined) return []
  const said = told(root, ["grep", "-I", "-l", "-F", one, "--"])
  return said === null ? [] : said.split("\n").filter((line) => line !== "")
}

export function reachedBy(reaching: Reaching, stated: Stated, said?: Told): Reach {
  const strong: Held[] = []
  const weak: Held[] = []
  if (stated.id !== null && lowerUuid(stated.id)) {
    const at = reaching.byId.get(stated.id)
    if (at !== undefined) {
      strong.push({ kind: "identity", at, said: `the page at ${at} states id \`${stated.id}\`` })
    } else {
      const tails = reaching.byTail.get(tailOf(stated.id)) ?? []
      for (const one of tails) {
        weak.push({
          kind: "tail",
          at: one,
          said: `the page at ${one} states an id ending \`${tailOf(stated.id)}\`, which an id replaced for being no uuid version 7 keeps`,
        })
      }
    }
  }
  if (stated.slug !== null && stated.pageTypeSlug !== null) {
    const key = nameOf(stated.pageTypeSlug, stated.slug)
    for (const one of reaching.byName.get(key) ?? []) {
      const field = fieldFound(reaching.bodyOf, one, stated.fields)
      if (field === null) {
        weak.push({
          kind: "name",
          at: one,
          said: `the page at ${one} is \`${key}\`, and no field of this file was found in that page`,
        })
        continue
      }
      strong.push({
        kind: "name",
        at: one,
        said: `the page at ${one} is \`${key}\` and carries \`${field}\``,
      })
    }
  }
  if (stated.blob !== null) {
    for (const one of reaching.byBlob.get(stated.blob) ?? []) {
      strong.push({ kind: "body", at: one, said: `${one} holds these very bytes` })
    }
  }
  const named = said?.get(stated.path)
  if (named !== undefined) {
    if (reaching.held.has(named)) {
      strong.push({
        kind: "told",
        at: named,
        said: `the migration that read this file composed ${named}, which is under akasha`,
      })
    } else {
      weak.push({
        kind: "told",
        at: named,
        said: `the migration named ${named}, and no such file is under akasha`,
      })
    }
  }
  if (strong.length > 0) return { reached: true, path: stated.path, held: [...strong, ...weak] }
  return { reached: false, path: stated.path, why: whyNot(reaching, stated), weak }
}

export function whyNot(reaching: Reaching, stated: Stated): string {
  if (!stated.there) return ABSENT
  const type = stated.pageTypeSlug
  if (type === null) return NO_NAME
  const many = reaching.byType.get(type) ?? 0
  if (many === 0) return `${NO_TYPE} \`${type}\` ${REGROUPED}`
  return `akasha carries ${many} pages of \`${type}\`, and none of them carries this file's slug`
}

export function reachOver(
  root: string,
  paths: readonly string[],
  said?: Told,
  reaching?: Reaching
): readonly Reach[] {
  const held = reaching ?? reachingIn(root)
  return statedIn(root, paths).map((one) => reachedBy(held, one, said))
}

export function reachSaid(reaches: readonly Reach[]): readonly string[] {
  return reaches.map((one) => {
    if (!one.reached) {
      const weak = one.weak.map((held) => ` — ${held.said}`).join("")
      return `unreached ${one.path} — ${one.why}${weak}`
    }
    return `reached ${one.path} — ${one.held.map((held) => held.said).join("; ")}`
  })
}

export function takeableIn(reaches: readonly Reach[]): readonly string[] {
  return reaches.filter((one) => one.reached).map((one) => one.path)
}
