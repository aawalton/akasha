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
  readonly edgesOf: (path: string) => Edges | null
  readonly parentOf: (path: string) => string | null
}

export type Resolution =
  | { readonly kind: "one"; readonly at: Standing }
  | { readonly kind: "none" }
  | { readonly kind: "many"; readonly among: readonly Standing[] }

export type Corpus = {
  readonly at: (path: string) => Standing | null
  readonly resolve: (slug: string, target: string | null) => Resolution
  readonly admits: (actual: string, wanted: string) => boolean
  readonly targetFor: (propertySlug: string) => string | null
  readonly partsOf: (path: string) => readonly string[]
  readonly parentOf: (path: string) => string | null
  readonly above: (path: string) => readonly string[]
  readonly requiredBy: (path: string) => readonly string[]
  readonly conditionalBelow: (path: string) => readonly string[]
  readonly definitionOf: (path: string) => string
  readonly valueOf: (path: string) => Record<string, unknown> | null
  readonly every: () => readonly Standing[]
}

const NAMED = /^(.+)\.([a-z0-9-]+)\.ts$/

const PAGE_TYPE = "page-type"

const PAGE_PROPERTY_TYPE = "page-property-type"

const EXTENDS = "extendsSlug"

const PART_SLUGS = "part-slugs"

const REQUIRED_READING_SLUGS = "required-reading-slugs"

const CONDITIONAL_READING_SLUGS = "conditional-reading-slugs"

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
  return found.sort()
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

type Reading = {
  readonly bySlug: ReadonlyMap<string, readonly Standing[]>
  readonly edgesOf: (path: string) => Edges | null
}

function readingOf(standing: readonly Standing[], edgesOf: (path: string) => Edges | null): Reading {
  const bySlug = new Map<string, Standing[]>()
  for (const one of standing) {
    const held = bySlug.get(one.slug)
    if (held === undefined) bySlug.set(one.slug, [one])
    else held.push(one)
  }
  return { bySlug, edgesOf }
}

function pageTypePageIn(held: Reading, slug: string): Standing | null {
  for (const one of held.bySlug.get(slug) ?? []) {
    if (one.pageTypeSlug === PAGE_TYPE) return one
  }
  return null
}

function admitsIn(held: Reading, actual: string, wanted: string): boolean {
  const walked = new Set<string>()
  let here: string | null = actual
  while (here !== null && !walked.has(here)) {
    if (here === wanted) return true
    walked.add(here)
    const page = pageTypePageIn(held, here)
    const value = page === null ? null : held.edgesOf(page.path)?.raw
    const above = value === undefined || value === null ? null : value[EXTENDS]
    here = typeof above === "string" ? above : null
  }
  return false
}

function resolveIn(held: Reading, slug: string, target: string | null): Resolution {
  const among = held.bySlug.get(slug) ?? []
  const fit = target === null ? among : among.filter((one) => admitsIn(held, one.pageTypeSlug, target))
  const first = fit[0]
  if (first === undefined) return { kind: "none" }
  if (fit.length > 1) return { kind: "many", among: fit }
  return { kind: "one", at: first }
}

function targetsIn(held: Reading): ReadonlyMap<string, string> {
  const kinds = new Map<string, Record<string, unknown>>()
  for (const [slug, among] of held.bySlug) {
    for (const one of among) {
      if (one.pageTypeSlug !== PAGE_PROPERTY_TYPE) continue
      const raw = held.edgesOf(one.path)?.raw
      if (raw !== undefined) kinds.set(slug, raw)
    }
  }
  const found = new Map<string, string>()
  const targetOf = (slug: string, walked: ReadonlySet<string>): string | null => {
    if (walked.has(slug)) return null
    const raw = kinds.get(slug)
    if (raw === undefined) return null
    const kind = raw["kind"]
    if (kind === "relation") {
      const named = raw["targetPageTypeSlug"]
      return typeof named === "string" ? named : null
    }
    if (kind !== "list") return null
    const entry = raw["entrySlug"]
    return typeof entry === "string" ? targetOf(entry, new Set([...walked, slug])) : null
  }
  for (const slug of kinds.keys()) {
    const target = targetOf(slug, new Set())
    if (target !== null) found.set(slug, target)
  }
  return found
}

function said(from: Standing, key: string, slug: string, what: Resolution): string {
  if (what.kind === "none") {
    return (
      `\`${from.slug}\` names \`${slug}\` under \`${key}\`, and no page carries that slug — ` +
      "a reading named and never reached is one the agent is never handed, so it is " +
      "refused here rather than dropped"
    )
  }
  const among = what.kind === "many" ? what.among.map((one) => `\`${one.pageTypeSlug}\``).join(" and ") : ""
  return (
    `\`${from.slug}\` names \`${slug}\` under \`${key}\`, and ${among} both carry that slug — ` +
    "a slug is unique among the pages of its page type, so this one is answered only where the " +
    "relation narrows it, and here it does not"
  )
}

function targetUnder(targets: ReadonlyMap<string, string>, key: string): string | null {
  return targets.get(key) ?? null
}

export function readingEvery(root: string): Source {
  const standing = standingIn(root)
  const loaded = new Map<string, Edges>()
  for (const one of standing) {
    const edges = valueIn(one)
    if (edges !== null) loaded.set(one.path, edges)
  }
  const edgesOf = (path: string): Edges | null => loaded.get(path) ?? null
  const held = readingOf(standing, edgesOf)
  const targets = targetsIn(held)
  const partTarget = targetUnder(targets, PART_SLUGS)

  const parent = new Map<string, string>()
  for (const one of standing) {
    const edges = edgesOf(one.path)
    if (edges === null) continue
    for (const part of edges.partSlugs) {
      const what = resolveIn(held, part, partTarget)
      if (what.kind !== "one") continue
      const already = parent.get(what.at.path)
      if (already !== undefined && already !== one.path) {
        throw new Error(
          `\`${part}\` is named a part by both \`${already}\` and \`${one.path}\` — ` +
            "a page is a part of one whole or the tree above it is two trees"
        )
      }
      parent.set(what.at.path, one.path)
    }
  }
  return { standing, edgesOf, parentOf: (path) => parent.get(path) ?? null }
}

export function corpusOver(source: Source): Corpus {
  const byPath = new Map<string, Standing>()
  for (const one of source.standing) byPath.set(one.path, one)
  const held = readingOf(source.standing, source.edgesOf)
  const targets = targetsIn(held)

  for (const one of source.standing) {
    const edges = source.edgesOf(one.path)
    if (edges === null) continue
    for (const [key, named] of [
      [PART_SLUGS, edges.partSlugs],
      [REQUIRED_READING_SLUGS, edges.requiredReadingSlugs],
      [CONDITIONAL_READING_SLUGS, edges.conditionalReadingSlugs],
    ] as const) {
      const target = targetUnder(targets, key)
      for (const slug of named) {
        const what = resolveIn(held, slug, target)
        if (what.kind !== "one") throw new Error(said(one, key, slug, what))
      }
    }
  }

  const above = (path: string): readonly string[] => {
    const found: string[] = []
    const walked = new Set<string>([path])
    let here = path
    for (;;) {
      const next = source.parentOf(here)
      if (next === null || walked.has(next)) return found
      walked.add(next)
      found.push(next)
      here = next
    }
  }

  const pathsUnder = (path: string, key: string, named: readonly string[]): readonly string[] => {
    const target = targetUnder(targets, key)
    const found: string[] = []
    for (const slug of named) {
      const what = resolveIn(held, slug, target)
      if (what.kind === "one") found.push(what.at.path)
    }
    return found
  }

  return {
    at: (path) => byPath.get(path) ?? null,
    resolve: (slug, target) => resolveIn(held, slug, target),
    admits: (actual, wanted) => admitsIn(held, actual, wanted),
    targetFor: (slug) => targetUnder(targets, slug),
    partsOf: (path) => pathsUnder(path, PART_SLUGS, source.edgesOf(path)?.partSlugs ?? []),
    parentOf: source.parentOf,
    above,
    requiredBy: (path) =>
      pathsUnder(path, REQUIRED_READING_SLUGS, source.edgesOf(path)?.requiredReadingSlugs ?? []),
    conditionalBelow: (path) =>
      pathsUnder(path, CONDITIONAL_READING_SLUGS, source.edgesOf(path)?.conditionalReadingSlugs ?? []),
    definitionOf: (path) => source.edgesOf(path)?.definition ?? "",
    valueOf: (path) => source.edgesOf(path)?.raw ?? null,
    every: () => source.standing,
  }
}

export function corpusIn(root: string): Corpus {
  return corpusOver(readingEvery(root))
}
