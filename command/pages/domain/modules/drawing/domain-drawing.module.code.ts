import { takenIn } from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { children } from "akasha/graph/predicate/pages/children/children.graph-predicate.ts"
import { parents } from "akasha/graph/predicate/pages/parents/parents.graph-predicate.ts"
import { answeringOver } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import {
  readingIn,
  valueByPath,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { kindsUnder } from "akasha/page/type/modules/descent/page-type-descent.module.code.ts"
import { namesDrawn } from "akasha/text/writing/modules/name-drawing/name-drawing.module.code.ts"

const DOMAINS = "domains"

const PERSONAS = "personas"

export const SUBJECTS: readonly string[] = [DOMAINS, PERSONAS]

const DOMAIN_TYPE = "domain"

const PERSONA_TYPE = "persona"

const SLUG = "slug"

const OPEN_ABOVE = "— already open above here"

export interface Entry {
  readonly slug: string
  readonly path: string
}

export interface Related {
  readonly under: ReadonlyMap<string, readonly string[]>
  readonly over: ReadonlyMap<string, readonly string[]>
}

export interface Drawn {
  readonly rooted: readonly string[]
  readonly above: readonly string[]
  readonly paths: boolean
  readonly descent: boolean
}

export function kindsUnderDomain(given: string | Reading): ReadonlySet<string> {
  return kindsUnder(DOMAIN_TYPE, readingIn(given))
}

export function domainsIn(given: string | Reading, descent: boolean): ReadonlyMap<string, Entry> {
  const reading = readingIn(given)
  const kinds = descent ? [...kindsUnderDomain(reading)].sort() : [DOMAIN_TYPE]
  const found = new Map<string, Entry>()
  for (const kind of kinds) {
    for (const one of valuesOfType(reading, kind)) {
      const slug = textAt(one.value as Value, SLUG)
      if (slug === null || slug === "" || found.has(slug)) continue
      found.set(slug, { slug, path: one.path })
    }
  }
  return found
}

export function entriesByPath(domains: ReadonlyMap<string, Entry>): ReadonlyMap<string, Entry> {
  return new Map([...domains.values()].map((one) => [one.path, one]))
}

function added(into: Map<string, string[]>, key: string, one: string): undefined {
  const already = into.get(key)
  if (already === undefined) into.set(key, [one])
  else already.push(one)
  return undefined
}

export function relatedIn(
  given: string | Reading,
  held: ReadonlyMap<string, Entry>,
  seeds: readonly string[],
  above: boolean
): Related {
  const reading = readingIn(given)
  const index = answeringOver(reading, (at) => valueByPath(reading, at))
  const taken = takenIn(above ? parents : children, seeds, {
    index,
    bodyAt: (at: string) => reading.read(at),
    through: (at: string) => held.has(at),
  })
  const under = new Map<string, string[]>()
  const over = new Map<string, string[]>()
  for (const edge of taken.edges) {
    if (edge.from === edge.to) continue
    added(under, edge.from, edge.to)
    added(over, edge.to, edge.from)
  }
  return { under, over }
}

function slugOfPath(path: string, held: ReadonlyMap<string, Entry>): string {
  return held.get(path)?.slug ?? path
}

function label(path: string, held: ReadonlyMap<string, Entry>, paths: boolean): string {
  const at = held.get(path)
  if (at === undefined) return path
  return paths ? `${at.slug}  ${at.path}` : at.slug
}

function ordered(paths: readonly string[], held: ReadonlyMap<string, Entry>): readonly string[] {
  return [...paths].sort((one, two) => {
    const here = slugOfPath(one, held)
    const there = slugOfPath(two, held)
    if (here !== there) return here.localeCompare(there)
    return one < two ? -1 : one > two ? 1 : 0
  })
}

interface Drawing {
  readonly held: ReadonlyMap<string, Entry>
  readonly under: ReadonlyMap<string, readonly string[]>
  readonly paths: boolean
}

function descend(
  path: string,
  depth: number,
  open: ReadonlySet<string>,
  drawing: Drawing,
  into: string[]
): undefined {
  const indent = "  ".repeat(depth)
  if (open.has(path)) {
    into.push(`${indent}${slugOfPath(path, drawing.held)}  ${OPEN_ABOVE}`)
    return undefined
  }
  into.push(`${indent}${label(path, drawing.held, drawing.paths)}`)
  const next = new Set([...open, path])
  for (const one of ordered(drawing.under.get(path) ?? [], drawing.held)) {
    descend(one, depth + 1, next, drawing, into)
  }
  return undefined
}

export function treeLines(
  from: readonly string[],
  held: ReadonlyMap<string, Entry>,
  under: ReadonlyMap<string, readonly string[]>,
  paths: boolean
): readonly string[] {
  const lines: string[] = []
  for (const path of from) descend(path, 0, new Set(), { held, under, paths }, lines)
  return lines
}

function ascend(
  path: string,
  held: ReadonlyMap<string, Entry>,
  over: ReadonlyMap<string, readonly string[]>,
  paths: boolean
): readonly string[] {
  const lines: string[] = [label(path, held, paths)]
  const seen = new Set([path])
  let frontier: readonly string[] = over.get(path) ?? []
  let depth = 1
  while (frontier.length > 0) {
    const next: string[] = []
    for (const one of ordered(frontier, held)) {
      if (seen.has(one)) continue
      seen.add(one)
      lines.push(`${"  ".repeat(depth)}${label(one, held, paths)}`)
      next.push(...(over.get(one) ?? []))
    }
    frontier = next
    depth += 1
  }
  return lines
}

function pathsOf(slugs: readonly string[], domains: ReadonlyMap<string, Entry>): readonly string[] {
  return slugs.flatMap((slug) => {
    const at = domains.get(slug)
    return at === undefined ? [] : [at.path]
  })
}

export function dagLines(wanted: Drawn, root: string): readonly string[] {
  const reading = readingIn(root)
  const domains = domainsIn(reading, wanted.descent)
  if (domains.size === 0) {
    throw new Error(
      `\`${root}\` carries no domain page, which is a dead read rather than a tree holding none`
    )
  }
  const unknown = [...wanted.rooted, ...wanted.above].filter((slug) => !domains.has(slug))
  if (unknown.length > 0) {
    throw new Error(`no domain page carries ${namesDrawn(unknown)}`)
  }
  const held = entriesByPath(domains)
  if (wanted.above.length > 0) {
    const seeds = pathsOf(wanted.above, domains)
    const over = relatedIn(reading, held, seeds, true).over
    return seeds.flatMap((path, at) => [
      ...(at > 0 ? [""] : []),
      ...ascend(path, held, over, wanted.paths),
    ])
  }
  if (wanted.rooted.length > 0) {
    const seeds = pathsOf(wanted.rooted, domains)
    return treeLines(seeds, held, relatedIn(reading, held, seeds, false).under, wanted.paths)
  }
  const every = [...held.keys()]
  const related = relatedIn(reading, held, every, false)
  const from = every.filter((path) => (related.over.get(path) ?? []).length === 0)
  return treeLines(ordered(from, held), held, related.under, wanted.paths)
}

export function declarationLines(asked: readonly string[], root: string): readonly string[] {
  const wanted = asked.length > 0 ? asked : SUBJECTS
  const subjects: Record<string, unknown> = {}
  for (const subject of wanted) {
    const records = valuesOfType(root, subject === DOMAINS ? DOMAIN_TYPE : PERSONA_TYPE).map(
      (one) => ({
        slug: textAt(one.value as Value, SLUG),
        path: one.path,
        page: one.value,
      })
    )
    if (records.length === 0) {
      throw new Error(
        `\`${root}\` carries no ${subject}, which is a dead read rather than a tree declaring none`
      )
    }
    subjects[subject] = { records }
  }
  return [JSON.stringify({ root, subjects }, null, 2)]
}
