import { createRequire } from "node:module"
import { readFileSync, readdirSync } from "node:fs"
import { oidOf } from "./reading.module.code.ts"

export type Standing = {
  readonly slug: string
  readonly pageTypeSlug: string
  readonly path: string
}

export type Edges = {
  readonly partSlugs: readonly string[]
  readonly requiredReadingSlugs: readonly string[]
  readonly conditionalReadingSlugs: readonly string[]
  readonly definition: string
  readonly raw: Record<string, unknown>
}

export type Source = {
  readonly standing: readonly Standing[]
  readonly edgesOf: (slug: string) => Edges | null
  readonly parentOf: (slug: string) => string | null
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

function listOn(value: Record<string, unknown>, key: string): readonly string[] {
  const held = value[key]
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

const reach_ = createRequire(import.meta.url)

function valueIn(at: Standing): Edges | null {
  const oid = oidOf(readFileSync(at.path, "utf8"))
  const mod = reach_(`${at.path}?oid=${oid}`) as Record<string, unknown>
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

function reach(from: string, key: string, slug: string, known: ReadonlySet<string>): void {
  if (known.has(slug)) return
  throw new Error(
    `\`${from}\` names \`${slug}\` under \`${key}\`, and no page carries that slug — ` +
      "a reading named and never reached is one the agent is never handed, so it is " +
      "refused here rather than dropped"
  )
}

export function parentsByInverting(
  standing: readonly Standing[],
  edgesOf: (slug: string) => Edges | null
): ReadonlyMap<string, string> {
  const parent = new Map<string, string>()
  for (const one of standing) {
    const edges = edgesOf(one.slug)
    if (edges === null) continue
    for (const part of edges.partSlugs) {
      const already = parent.get(part)
      if (already !== undefined && already !== one.slug) {
        throw new Error(
          `\`${part}\` is named a part by both \`${already}\` and \`${one.slug}\` — ` +
            "a page is a part of one whole or the tree above it is two trees"
        )
      }
      parent.set(part, one.slug)
    }
  }
  return parent
}

export function readingEvery(root: string): Source {
  const standing = standingIn(root)
  const known = new Set<string>()
  for (const one of standing) {
    if (known.has(one.slug)) {
      throw new Error(
        `\`${one.slug}\` is carried by more than one page — ` +
          "a slug reaches one page or it addresses nothing"
      )
    }
    known.add(one.slug)
  }
  const loaded = new Map<string, Edges>()
  for (const one of standing) {
    const edges = valueIn(one)
    if (edges !== null) loaded.set(one.slug, edges)
  }
  const edgesOf = (slug: string): Edges | null => loaded.get(slug) ?? null
  const parent = parentsByInverting(standing, edgesOf)
  return { standing, edgesOf, parentOf: (slug) => parent.get(slug) ?? null }
}

export function corpusOver(source: Source): Corpus {
  const known = new Map<string, Standing>()
  for (const one of source.standing) known.set(one.slug, one)
  const slugs = new Set(known.keys())

  for (const one of source.standing) {
    const edges = source.edgesOf(one.slug)
    if (edges === null) continue
    for (const named of edges.partSlugs) reach(one.slug, "partSlugs", named, slugs)
    for (const named of edges.requiredReadingSlugs) {
      reach(one.slug, "requiredReadingSlugs", named, slugs)
    }
    for (const named of edges.conditionalReadingSlugs) {
      reach(one.slug, "conditionalReadingSlugs", named, slugs)
    }
  }

  const above = (slug: string): readonly string[] => {
    const found: string[] = []
    const walked = new Set<string>([slug])
    let here = slug
    for (;;) {
      const next = source.parentOf(here)
      if (next === null || walked.has(next)) return found
      walked.add(next)
      found.push(next)
      here = next
    }
  }

  return {
    at: (slug) => known.get(slug) ?? null,
    partsOf: (slug) => source.edgesOf(slug)?.partSlugs ?? [],
    parentOf: source.parentOf,
    above,
    requiredBy: (slug) => source.edgesOf(slug)?.requiredReadingSlugs ?? [],
    conditionalBelow: (slug) => source.edgesOf(slug)?.conditionalReadingSlugs ?? [],
    definitionOf: (slug) => source.edgesOf(slug)?.definition ?? "",
    valueOf: (slug) => source.edgesOf(slug)?.raw ?? null,
    every: () => source.standing,
  }
}

export function corpusIn(root: string): Corpus {
  return corpusOver(readingEvery(root))
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
