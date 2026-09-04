import { resolve } from "node:path"
import { sayAnswer } from "@akasha/command-system/answer-bytes"
import type { Answer, Given } from "@akasha/command-system/calling"
import { AUTHOR } from "@akasha/command-system/committing"
import { whyOf } from "@akasha/command-system/fault-saying"
import { writerIn } from "@akasha/command-system/reading"
import { rootOf } from "@akasha/command-system/rooting"
import { readingIn, type Valued, valuesOfType } from "@akasha/indexes"
import { AKASHA } from "@akasha/pages-system/checkout-roots"
import { slugAt, slugsIn, textAt, type Value } from "@akasha/pages-system/page-value"

const PROPERTY_ROOT = "page-property"

const PAGE_TYPE = "page-type"

const ON_TYPE = "page-type"

const ON_PROPERTY_TYPE = "page-property-type"

const NO_PARENT = null

const SUFFIX = "-property"

export interface Row {
  readonly at: string
  readonly values: Readonly<Record<string, string | readonly string[] | null>>
}

export interface Answers {
  readonly types: readonly Row[]
  readonly properties: readonly Row[]
  readonly propertyTypes: readonly Row[]
}

interface Declaration {
  readonly pagePropertySlug: string
  readonly required?: boolean
  readonly many?: boolean
  readonly max?: number | null
}

interface Held {
  readonly at: string
  readonly kind: string
  readonly slug: string
  readonly value: Value
}

function atOf(path: string): string {
  return `${AKASHA}:${path}`
}

function declarationsIn(value: Value): readonly Declaration[] {
  const held = value["properties"]
  if (!Array.isArray(held)) return []
  const found: Declaration[] = []
  for (const one of held) {
    if (one === null || typeof one !== "object" || Array.isArray(one)) continue
    const said = one as Record<string, unknown>
    const named = said["pagePropertySlug"]
    if (typeof named !== "string") continue
    const bound = said["max"]
    found.push({
      pagePropertySlug: named,
      required: said["required"] === true,
      many: said["many"] === true,
      max: typeof bound === "number" ? bound : null,
    })
  }
  return found
}

function reachesProperty(slug: string, types: ReadonlyMap<string, Value>): boolean {
  const walked = new Set<string>()
  const ahead: string[] = [slug]
  for (;;) {
    const at = ahead.pop()
    if (at === undefined) return false
    if (at === PROPERTY_ROOT) return true
    if (walked.has(at)) continue
    walked.add(at)
    const above = types.get(at)
    if (above !== undefined) ahead.push(...slugsIn(above["extendsSlug"]))
  }
}

export function propertyKindsIn(types: ReadonlyMap<string, Value>): ReadonlySet<string> {
  const found = new Set<string>()
  for (const slug of types.keys()) {
    if (slug !== PROPERTY_ROOT && reachesProperty(slug, types)) found.add(slug)
  }
  return found
}

function namingOver(held: readonly Held[]): (kind: string, slug: string) => string {
  const carried = new Map<string, number>()
  for (const one of held) carried.set(one.slug, (carried.get(one.slug) ?? 0) + 1)
  return (kind, slug) => ((carried.get(slug) ?? 0) > 1 ? `${kind}/${slug}` : slug)
}

function reachOver(held: readonly Held[]): (named: string) => Held | undefined {
  const byBare = new Map<string, Held>()
  for (const one of held) if (!byBare.has(one.slug)) byBare.set(one.slug, one)
  const byQualified = new Map<string, Held[]>()
  for (const one of held) {
    const at = `${one.kind}/${one.slug}`
    byQualified.set(at, [...(byQualified.get(at) ?? []), one])
  }
  return (named) => {
    const found = byQualified.get(named)
    if (found !== undefined) return found.length === 1 ? found[0] : undefined
    return byBare.get(named)
  }
}

function baseOf(kind: string): string {
  return kind.endsWith(SUFFIX) ? kind.slice(0, -SUFFIX.length) : kind
}

function typeOf(one: Held, said: Declaration): string {
  const target = slugAt(one.value, "targetPageTypeSlug")
  const format = slugAt(one.value, "nameFormatSlug")
  const inner =
    target !== null
      ? `${baseOf(one.kind)}(${target})`
      : format !== null
        ? `${baseOf(one.kind)}(${format})`
        : baseOf(one.kind)
  const bound = said.max === undefined || said.max === null ? "" : `, max ${said.max}`
  const listed = said.many === true ? `list(${inner}${bound})` : inner
  return said.required === true ? listed : `${listed} | none`
}

function propertyRow(one: Held, said: Declaration, on: string, named: string): Row {
  return {
    at: one.at,
    values: {
      slug: named,
      key: textAt(one.value, "propertySlug") ?? one.slug,
      "defined-on-slug": on,
      type: typeOf(one, said),
    },
  }
}

export function answersFrom(
  pageTypes: readonly Valued[],
  properties: ReadonlyMap<string, readonly Valued[]>
): Answers {
  const byType = new Map(pageTypes.map((one) => [textAt(one.value, "slug") ?? "", one.value]))

  const held: Held[] = []
  for (const [kind, listed] of properties) {
    for (const one of listed) {
      const slug = textAt(one.value, "slug")
      if (slug === null) continue
      held.push({ at: atOf(one.path), kind, slug, value: one.value })
    }
  }
  const naming = namingOver(held)
  const reach = reachOver(held)

  const types: Row[] = []
  for (const one of pageTypes) {
    const slug = textAt(one.value, "slug")
    if (slug === null) continue
    const at = atOf(one.path)
    const above = slugsIn(one.value["extendsSlug"])
    if (above.length === 0) {
      types.push({ at, values: { slug, "extends-slug": NO_PARENT } })
      continue
    }
    for (const parent of above) types.push({ at, values: { slug, "extends-slug": parent } })
  }

  const drawn: Row[] = []
  const unresolved: string[] = []
  const gather = (value: Value, on: string): undefined => {
    for (const said of declarationsIn(value)) {
      const one = reach(said.pagePropertySlug)
      if (one === undefined) {
        unresolved.push(`${on} declares \`${said.pagePropertySlug}\`, which names no property page`)
        continue
      }
      drawn.push(propertyRow(one, said, on, naming(one.kind, one.slug)))
    }
    return undefined
  }

  for (const [slug, value] of byType) {
    if (slug !== "") gather(value, `${ON_TYPE}/${slug}`)
  }

  const propertyTypes: Row[] = []
  for (const one of held) {
    const named = naming(one.kind, one.slug)
    propertyTypes.push({
      at: one.at,
      values: {
        "type-slug": named,
        kind: one.kind,
        suffix: null,
        of: textAt(one.value, "definition"),
        value: null,
      },
    })
    gather(one.value, `${ON_PROPERTY_TYPE}/${named}`)
  }

  if (unresolved.length > 0) {
    throw new Error(
      `the index answered ${unresolved.length} declaration(s) naming no property page: ` +
        unresolved.sort().join("; ")
    )
  }

  return { types, properties: drawn, propertyTypes }
}

export function pageAnswers(root: string): Answers {
  const reading = readingIn(root)
  const pageTypes = valuesOfType(reading, PAGE_TYPE)
  const byType = new Map<string, Value>()
  for (const one of pageTypes) {
    const slug = textAt(one.value, "slug")
    if (slug !== null) byType.set(slug, one.value)
  }
  const properties = new Map<string, readonly Valued[]>()
  for (const kind of [...propertyKindsIn(byType)].sort()) {
    properties.set(kind, valuesOfType(reading, kind))
  }
  return answersFrom(pageTypes, properties)
}

export function refusalsIn(argv: readonly string[]): readonly string[] {
  return argv.map((one) => `\`${one}\` is no word this takes — it takes no word at all`)
}

export function pageTree(argv: readonly string[], given: Given): Answer {
  const refusals = refusalsIn(argv)
  if (refusals.length > 0) return { report: [], refusals, code: 1 }
  try {
    return { report: [JSON.stringify(pageAnswers(resolve(given.root)))], refusals: [], code: 0 }
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 3 }
  }
}

if (import.meta.main) {
  const stated = process.env["AKASHA_ROOT"]
  const said = process.env["AKASHA_WRITER"]
  const answer = pageTree(process.argv.slice(2), {
    root: stated === undefined || stated === "" ? rootOf(import.meta.path) : resolve(stated),
    calledAs: "akasha page-tree",
    from: process.cwd(),
    writer: said === undefined || said === "" ? AUTHOR : said,
    agentId: writerIn(process.env),
  })
  if (answer.report.length > 0) sayAnswer(answer.report.map((one) => `${one}\n`).join(""))
  for (const one of answer.refusals) process.stderr.write(`${one}\n`)
  process.exitCode = answer.code
}
