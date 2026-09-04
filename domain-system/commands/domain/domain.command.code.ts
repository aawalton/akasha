import { resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { valuesOfType } from "@akasha/indexes"

export const DAG = "dag"

export const DECLARATIONS = "declarations"

export const AT_DOMAIN = "--domain"

export const UP = "--up"

export const PATHS = "--paths"

export const DESCENT = "--descent"

export const SUBJECT = "--subject"

export const DOMAINS = "domains"

export const PERSONAS = "personas"

const ACTS: readonly string[] = [DAG, DECLARATIONS]

const SUBJECTS: readonly string[] = [DOMAINS, PERSONAS]

const DOMAIN_TYPE = "domain"

const PERSONA_TYPE = "persona"

const PAGE_TYPE = "page-type"

const PART = "domain/"

const SLUG = "slug"

const EXTENDS = "extendsSlug"

const PART_SLUGS = "partSlugs"

const UNDECLARED = "— named as a part, carried by no domain page"

const OPEN_ABOVE = "— already open above here"

export interface Wanted {
  readonly act: string
  readonly rooted: readonly string[]
  readonly above: readonly string[]
  readonly paths: boolean
  readonly descent: boolean
  readonly subjects: readonly string[]
}

export type Read = Wanted | { readonly refused: readonly string[] }

function said(words: readonly string[]): string {
  return words.map((one) => `\`${one}\``).join(", ")
}

function forAct(flag: string, act: string): string {
  return `\`${flag}\` is taken by \`${act}\` alone`
}

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  const rooted: string[] = []
  const above: string[] = []
  const subjects: string[] = []
  let paths = false
  let descent = false
  let act: string | null = null
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one === PATHS) {
      paths = true
      continue
    }
    if (one === DESCENT) {
      descent = true
      continue
    }
    if (one === AT_DOMAIN || one === UP || one === SUBJECT) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined || value.startsWith("-")) {
        refusals.push(`\`${one}\` names one word and nothing followed it`)
        continue
      }
      if (one === AT_DOMAIN) rooted.push(value)
      else if (one === UP) above.push(value)
      else subjects.push(value)
      continue
    }
    if (one.startsWith("-")) {
      refusals.push(
        `\`${one}\` is no flag this takes — it takes ${said([AT_DOMAIN, UP, PATHS, DESCENT, SUBJECT])}`
      )
      continue
    }
    if (act !== null) {
      refusals.push(`\`${one}\` follows the act \`${act}\`, and one call names one act`)
      continue
    }
    act = one
  }
  if (act === null) {
    return { refused: [...refusals, `this names no act — it carries ${said(ACTS)}`] }
  }
  if (!ACTS.includes(act)) {
    refusals.push(`\`${act}\` is no act this carries — it carries ${said(ACTS)}`)
  }
  if (act === DECLARATIONS) {
    if (rooted.length > 0) refusals.push(forAct(AT_DOMAIN, DAG))
    if (above.length > 0) refusals.push(forAct(UP, DAG))
    if (paths) refusals.push(forAct(PATHS, DAG))
    if (descent) refusals.push(forAct(DESCENT, DAG))
    for (const one of subjects) {
      if (!SUBJECTS.includes(one)) {
        refusals.push(`\`${one}\` is no subject — \`${SUBJECT}\` names ${said(SUBJECTS)}`)
      }
    }
  }
  if (act === DAG && subjects.length > 0) refusals.push(forAct(SUBJECT, DECLARATIONS))
  if (refusals.length > 0) return { refused: refusals }
  return { act, rooted, above, paths, descent, subjects }
}

export interface Standing {
  readonly slug: string
  readonly path: string
  readonly parts: readonly string[]
}

function slugOf(said: string): string {
  const at = said.lastIndexOf("/")
  return at === -1 ? said : said.slice(at + 1)
}

function textIn(value: Record<string, unknown>, key: string): string | null {
  const said = value[key]
  return typeof said === "string" && said !== "" ? said : null
}

export function kindsUnderDomain(root: string): ReadonlySet<string> {
  const above = new Map<string, string>()
  for (const one of valuesOfType(root, PAGE_TYPE)) {
    const value = one.value as Record<string, unknown>
    const slug = textIn(value, SLUG)
    const said = textIn(value, EXTENDS)
    if (slug !== null && said !== null) above.set(slug, slugOf(said))
  }
  const under = new Set<string>([DOMAIN_TYPE])
  for (;;) {
    let grew = false
    for (const [held, parent] of above) {
      if (!under.has(held) && under.has(parent)) {
        under.add(held)
        grew = true
      }
    }
    if (!grew) return under
  }
}

function partsOf(value: Record<string, unknown>): readonly string[] {
  const held = value[PART_SLUGS]
  if (!Array.isArray(held)) return []
  return held.flatMap((one) =>
    typeof one === "string" && one.startsWith(PART) ? [slugOf(one)] : []
  )
}

export function domainsIn(root: string, descent: boolean): ReadonlyMap<string, Standing> {
  const kinds = descent ? [...kindsUnderDomain(root)].sort() : [DOMAIN_TYPE]
  const found = new Map<string, Standing>()
  for (const kind of kinds) {
    for (const one of valuesOfType(root, kind)) {
      const value = one.value as Record<string, unknown>
      const slug = textIn(value, SLUG)
      if (slug === null || found.has(slug)) continue
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
  domains: ReadonlyMap<string, Standing>
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

function label(slug: string, domains: ReadonlyMap<string, Standing>, paths: boolean): string {
  const at = domains.get(slug)
  if (at === undefined) return `${slug}  ${UNDECLARED}`
  return paths ? `${slug}  ${at.path}` : slug
}

function descend(
  slug: string,
  depth: number,
  open: ReadonlySet<string>,
  domains: ReadonlyMap<string, Standing>,
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

function ascend(
  slug: string,
  domains: ReadonlyMap<string, Standing>,
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

export function dagLines(wanted: Wanted, root: string): readonly string[] {
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
  const lines: string[] = []
  for (const slug of from) descend(slug, 0, new Set(), domains, wanted.paths, lines)
  return lines
}

export function declarationLines(wanted: Wanted, root: string): readonly string[] {
  const asked = wanted.subjects.length > 0 ? wanted.subjects : SUBJECTS
  const subjects: Record<string, unknown> = {}
  for (const subject of asked) {
    const records = valuesOfType(root, subject === DOMAINS ? DOMAIN_TYPE : PERSONA_TYPE).map(
      (one) => ({
        slug: textIn(one.value as Record<string, unknown>, SLUG),
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

export function domain(argv: readonly string[], given: Given): Answer {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  const root = resolve(given.root)
  try {
    const lines = read.act === DAG ? dagLines(read, root) : declarationLines(read, root)
    return { report: [...lines], refusals: [], code: 0 }
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 3 }
  }
}
