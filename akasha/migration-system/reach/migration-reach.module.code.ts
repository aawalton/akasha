import { readFileSync } from "node:fs"
import { told } from "@akasha/git/git-running"
import { lowerUuid } from "@akasha/pages-system/name-format/lower-uuid"

const INSIDE = "akasha/"

const TAIL = 8

const FRONT = "---"

const DECLARING = '^\\s*(id|slug|pageTypeSlug)\\s*:\\s*"'

const DECLARED = /^\s*(id|slug|pageTypeSlug)\s*:\s*"([^"]+)"/

const FILED = /^\s*(id|slug|page-type-slug)\s*:\s*"?([^"#]+?)"?\s*$/

const HEAD = 4096

export type Inside = {
  readonly path: string
  readonly id: string | null
  readonly slug: string | null
  readonly pageTypeSlug: string | null
}

export type Reaching = {
  readonly at: string
  readonly pages: readonly Inside[]
  readonly byId: ReadonlyMap<string, string>
  readonly byTail: ReadonlyMap<string, readonly string[]>
  readonly byName: ReadonlyMap<string, readonly string[]>
  readonly byBlob: ReadonlyMap<string, readonly string[]>
  readonly held: ReadonlySet<string>
}

export type Stated = {
  readonly path: string
  readonly id: string | null
  readonly slug: string | null
  readonly pageTypeSlug: string | null
  readonly blob: string | null
}

export type Told = ReadonlyMap<string, string>

export type Held = {
  readonly kind: "identity" | "body" | "name" | "told" | "tail"
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
  const named = told(root, ["grep", "-I", "-E", DECLARING, "--", INSIDE])
  const pages = declaredIn(linesOf(named))
  const byId = new Map<string, string>()
  const byTail = new Map<string, string[]>()
  const byName = new Map<string, string[]>()
  const held = new Set<string>()
  for (const one of pages) {
    held.add(one.path)
    if (one.id !== null) {
      if (!byId.has(one.id)) byId.set(one.id, one.path)
      pushed(byTail, tailOf(one.id), one.path)
    }
    if (one.slug !== null && one.pageTypeSlug !== null) {
      pushed(byName, nameOf(one.pageTypeSlug, one.slug), one.path)
    }
  }
  const byBlob = blobsIn(linesOf(told(root, ["ls-files", "-s", "--", INSIDE])))
  for (const paths of byBlob.values()) for (const one of paths) held.add(one)
  return { at, pages, byId, byTail, byName, byBlob, held }
}

export function statedOf(path: string, text: string): Omit<Stated, "blob"> {
  const held: { id: string | null; slug: string | null; pageTypeSlug: string | null } = {
    id: null,
    slug: null,
    pageTypeSlug: null,
  }
  const lines = text.split("\n")
  const front = lines[0]?.trim() === FRONT
  for (const [at, line] of lines.entries()) {
    if (front && at > 0 && line.trim() === FRONT) break
    const said = front ? FILED.exec(line) : DECLARED.exec(line)
    if (said === null) continue
    const value = (said[2] ?? "").trim()
    if (said[1] === "id") held.id = value
    if (said[1] === "slug") held.slug = value
    if (said[1] === "pageTypeSlug" || said[1] === "page-type-slug") held.pageTypeSlug = value
  }
  return { path, ...held }
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
    return { ...statedOf(path, text), blob: blobOf.get(path) ?? null }
  })
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
      strong.push({ kind: "name", at: one, said: `the page at ${one} is \`${key}\`` })
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
  return {
    reached: false,
    path: stated.path,
    why: "nothing under akasha states its id, carries its name, holds its bytes, or was named for it",
    weak,
  }
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
