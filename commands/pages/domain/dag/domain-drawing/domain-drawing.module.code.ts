import { readingIn, valuesOfType } from "@akasha/indexes"
import { kindsUnder } from "@akasha/pages/page-type-descent"
import { valueAt } from "@akasha/pages/page-value"
import { textAt, type Value } from "@akasha/pages/page-value-reading"
import type { Answer } from "../../../../modules/calling/calling.module.code.ts"
import { whyOf } from "../../../../modules/fault-saying/fault-saying.module.code.ts"

export const DOMAINS = "domains"

export const PERSONAS = "personas"

export const SUBJECTS: readonly string[] = [DOMAINS, PERSONAS]

const DOMAIN_TYPE = "domain"

const PERSONA_TYPE = "persona"

const PART = "domain/"

const SLUG = "slug"

const PARTS = "parts"

const UNDECLARED = "— named as a part, carried by no domain page"

const OPEN_ABOVE = "— already open above here"

export interface Entry {
  readonly slug: string
  readonly path: string
  readonly parts: readonly string[]
}

export interface Drawn {
  readonly rooted: readonly string[]
  readonly above: readonly string[]
  readonly paths: boolean
  readonly descent: boolean
}

export function kindsUnderDomain(root: string): ReadonlySet<string> {
  return kindsUnder(DOMAIN_TYPE, readingIn(root), (path) => valueAt(path, root))
}

function partsOf(value: Value): readonly string[] {
  const held = value[PARTS]
  if (!Array.isArray(held)) return []
  return held.flatMap((one) =>
    typeof one === "string" && one.startsWith(PART) ? [one.slice(PART.length)] : []
  )
}

export function domainsIn(root: string, descent: boolean): ReadonlyMap<string, Entry> {
  const kinds = descent ? [...kindsUnderDomain(root)].sort() : [DOMAIN_TYPE]
  const found = new Map<string, Entry>()
  for (const kind of kinds) {
    for (const one of valuesOfType(root, kind)) {
      const value = one.value as Value
      const slug = textAt(value, SLUG)
      if (slug === null || slug === "" || found.has(slug)) continue
      found.set(slug, {
        slug,
        path: one.path,
        parts: partsOf(value).filter((part) => part !== slug),
      })
    }
  }
  return found
}

export function heldBy(
  domains: ReadonlyMap<string, Entry>
): ReadonlyMap<string, readonly string[]> {
  const holders = new Map<string, string[]>()
  for (const one of domains.values()) {
    for (const part of one.parts) {
      const already = holders.get(part)
      if (already === undefined) holders.set(part, [one.slug])
      else already.push(one.slug)
    }
  }
  return holders
}

function label(slug: string, domains: ReadonlyMap<string, Entry>, paths: boolean): string {
  const at = domains.get(slug)
  if (at === undefined) return `${slug}  ${UNDECLARED}`
  return paths ? `${slug}  ${at.path}` : slug
}

function descend(
  slug: string,
  depth: number,
  open: ReadonlySet<string>,
  domains: ReadonlyMap<string, Entry>,
  paths: boolean,
  into: string[]
): undefined {
  const indent = "  ".repeat(depth)
  if (open.has(slug)) {
    into.push(`${indent}${slug}  ${OPEN_ABOVE}`)
    return undefined
  }
  into.push(`${indent}${label(slug, domains, paths)}`)
  const next = new Set([...open, slug])
  const parts = [...(domains.get(slug)?.parts ?? [])].sort((one, two) => one.localeCompare(two))
  for (const part of parts) descend(part, depth + 1, next, domains, paths, into)
  return undefined
}

export function treeLines(
  from: readonly string[],
  domains: ReadonlyMap<string, Entry>,
  paths: boolean
): readonly string[] {
  const lines: string[] = []
  for (const slug of from) descend(slug, 0, new Set(), domains, paths, lines)
  return lines
}

function ascend(
  slug: string,
  domains: ReadonlyMap<string, Entry>,
  holders: ReadonlyMap<string, readonly string[]>,
  paths: boolean
): readonly string[] {
  const lines: string[] = [label(slug, domains, paths)]
  const seen = new Set([slug])
  let frontier: readonly string[] = holders.get(slug) ?? []
  let depth = 1
  while (frontier.length > 0) {
    const next: string[] = []
    for (const one of [...frontier].sort((a, b) => a.localeCompare(b))) {
      if (seen.has(one)) continue
      seen.add(one)
      lines.push(`${"  ".repeat(depth)}${label(one, domains, paths)}`)
      next.push(...(holders.get(one) ?? []))
    }
    frontier = next
    depth += 1
  }
  return lines
}

export function dagLines(wanted: Drawn, root: string): readonly string[] {
  const domains = domainsIn(root, wanted.descent)
  if (domains.size === 0) {
    throw new Error(
      `\`${root}\` carries no domain page, which is a dead read rather than a tree holding none`
    )
  }
  const holders = heldBy(domains)
  const unknown = [...wanted.rooted, ...wanted.above].filter((slug) => !domains.has(slug))
  if (unknown.length > 0) {
    throw new Error(`no domain page carries ${unknown.map((one) => `\`${one}\``).join(", ")}`)
  }
  if (wanted.above.length > 0) {
    return wanted.above.flatMap((slug, at) => [
      ...(at > 0 ? [""] : []),
      ...ascend(slug, domains, holders, wanted.paths),
    ])
  }
  const from =
    wanted.rooted.length > 0
      ? wanted.rooted
      : [...domains.values()]
          .filter((one) => (holders.get(one.slug) ?? []).length === 0)
          .map((one) => one.slug)
          .sort((one, two) => one.localeCompare(two))
  return treeLines(from, domains, wanted.paths)
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

export function answering(lines: () => readonly string[]): Answer {
  try {
    return { report: [...lines()], refusals: [], code: 0 }
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 3 }
  }
}
