import { readFileSync, readdirSync } from "node:fs"
import { oidOf } from "./reading.module.code.ts"

export type Standing = {
  readonly slug: string
  readonly pageTypeSlug: string
  readonly path: string
}

export type Corpus = {
  readonly at: (slug: string) => Standing | null
  readonly partsOf: (slug: string) => readonly string[]
  readonly parentOf: (slug: string) => string | null
  readonly above: (slug: string) => readonly string[]
  readonly requiredBy: (slug: string) => readonly string[]
  readonly conditionalBelow: (slug: string) => readonly string[]
  readonly definitionOf: (slug: string) => string
  readonly valueOf: (slug: string) => Record<string, unknown> | null
  readonly every: () => readonly Standing[]
}

const NAMED = /^(.+)\.([a-z0-9-]+)\.ts$/

const PAGE_TYPE = "page-type"

function filesUnder(root: string): readonly string[] {
  const found: string[] = []
  const walk = (at: string): void => {
    for (const entry of readdirSync(at, { withFileTypes: true })) {
      const here = `${at}/${entry.name}`
      if (entry.isDirectory()) walk(here)
      else if (NAMED.test(entry.name)) found.push(here)
    }
  }
  walk(root)
  return found
}

function pageTypesAmong(paths: readonly string[]): ReadonlySet<string> {
  const found = new Set<string>([PAGE_TYPE])
  for (const path of paths) {
    const name = path.slice(path.lastIndexOf("/") + 1)
    const said = NAMED.exec(name)
    if (said !== null && said[2] === PAGE_TYPE && said[1] !== undefined) found.add(said[1])
  }
  return found
}

export function standingIn(root: string): readonly Standing[] {
  const paths = filesUnder(root)
  const pageTypes = pageTypesAmong(paths)
  const found: Standing[] = []
  for (const path of paths) {
    const name = path.slice(path.lastIndexOf("/") + 1)
    const said = NAMED.exec(name)
    if (said === null) continue
    const slug = said[1]
    const pageTypeSlug = said[2]
    if (slug === undefined || pageTypeSlug === undefined) continue
    if (!pageTypes.has(pageTypeSlug)) continue
    found.push({ slug, pageTypeSlug, path })
  }
  return found
}

type Loaded = {
  readonly raw: Record<string, unknown>
  readonly partSlugs: readonly string[]
  readonly requiredReadingSlugs: readonly string[]
  readonly conditionalReadingSlugs: readonly string[]
  readonly definition: string
}

function listOn(value: Record<string, unknown>, key: string): readonly string[] {
  const held = value[key]
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

async function valueIn(at: Standing): Promise<Loaded | null> {
  const oid = oidOf(readFileSync(at.path, "utf8"))
  const mod = (await import(`${at.path}?oid=${oid}`)) as Record<string, unknown>
  for (const held of Object.values(mod)) {
    if (held === null || typeof held !== "object") continue
    const value = held as Record<string, unknown>
    if (value["slug"] !== at.slug) continue
    const definition = value["definition"]
    return {
      raw: value,
      partSlugs: listOn(value, "partSlugs"),
      requiredReadingSlugs: listOn(value, "requiredReadingSlugs"),
      conditionalReadingSlugs: listOn(value, "conditionalReadingSlugs"),
      definition: typeof definition === "string" ? definition : "",
    }
  }
  return null
}

function reach(from: string, key: string, slug: string, known: ReadonlyMap<string, Standing>): void {
  if (known.has(slug)) return
  throw new Error(
    `\`${from}\` names \`${slug}\` under \`${key}\`, and no page carries that slug — ` +
      "a reading named and never reached is one the agent is never handed, so it is " +
      "refused here rather than dropped"
  )
}

export async function corpusIn(root: string): Promise<Corpus> {
  const standing = standingIn(root)
  const known = new Map<string, Standing>()
  for (const one of standing) {
    const already = known.get(one.slug)
    if (already !== undefined) {
      throw new Error(
        `\`${one.slug}\` is carried by both \`${already.path}\` and \`${one.path}\` — ` +
          "a slug reaches one page or it addresses nothing"
      )
    }
    known.set(one.slug, one)
  }

  const loaded = new Map<string, Loaded>()
  await Promise.all(
    standing.map(async (one) => {
      const value = await valueIn(one)
      if (value !== null) loaded.set(one.slug, value)
    })
  )

  const parent = new Map<string, string>()
  for (const [slug, value] of loaded) {
    for (const part of value.partSlugs) {
      reach(slug, "partSlugs", part, known)
      const already = parent.get(part)
      if (already !== undefined && already !== slug) {
        throw new Error(
          `\`${part}\` is named a part by both \`${already}\` and \`${slug}\` — ` +
            "a page is a part of one whole or the tree above it is two trees"
        )
      }
      parent.set(part, slug)
    }
    for (const named of value.requiredReadingSlugs) reach(slug, "requiredReadingSlugs", named, known)
    for (const named of value.conditionalReadingSlugs) {
      reach(slug, "conditionalReadingSlugs", named, known)
    }
  }

  const above = (slug: string): readonly string[] => {
    const found: string[] = []
    const walked = new Set<string>([slug])
    let here = slug
    for (;;) {
      const next = parent.get(here)
      if (next === undefined || walked.has(next)) return found
      walked.add(next)
      found.push(next)
      here = next
    }
  }

  return {
    at: (slug) => known.get(slug) ?? null,
    partsOf: (slug) => loaded.get(slug)?.partSlugs ?? [],
    parentOf: (slug) => parent.get(slug) ?? null,
    above,
    requiredBy: (slug) => loaded.get(slug)?.requiredReadingSlugs ?? [],
    conditionalBelow: (slug) => loaded.get(slug)?.conditionalReadingSlugs ?? [],
    definitionOf: (slug) => loaded.get(slug)?.definition ?? "",
    valueOf: (slug) => loaded.get(slug)?.raw ?? null,
    every: () => standing,
  }
}

export function closureFor(slug: string, corpus: Corpus): readonly string[] {
  const reached = new Set<string>()
  const queue = [...corpus.above(slug), ...corpus.requiredBy(slug)]
  while (queue.length > 0) {
    const one = queue.shift()
    if (one === undefined || one === slug || reached.has(one)) continue
    reached.add(one)
    for (const next of corpus.requiredBy(one)) queue.push(next)
    for (const next of corpus.above(one)) queue.push(next)
  }
  return [...reached].sort()
}
