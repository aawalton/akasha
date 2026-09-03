import { resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { AUTHOR } from "@akasha/command-system/committing"
import { whyOf } from "@akasha/command-system/fault-saying"
import { writerIn } from "@akasha/command-system/reading"
import { rootOf } from "@akasha/command-system/rooting"
import { readingIn, type Valued, valuesOfType } from "@akasha/indexes"
import { AKASHA } from "@akasha/pages-system/checkout-roots"
import { slugAt, textAt, type Value } from "@akasha/pages-system/page-value"

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
    const named = (one as Record<string, unknown>)["pagePropertySlug"]
    if (typeof named !== "string") continue
    found.push(one as unknown as Declaration)
  }
  return found
}

// WHICH PAGE TYPES ARE KINDS OF PROPERTY, walked down `extendsSlug` from `page-property` rather
// than read off a list here. `named-file-property` extends `file-property` rather than the root,
// so a list of the root's children would miss it, and a new kind added tomorrow would be missed
// the same way.
function propertyKindsIn(types: ReadonlyMap<string, Value>): ReadonlySet<string> {
  const found = new Set<string>()
  for (const [slug, value] of types) {
    const walked = new Set<string>()
    let at: string | null = slug
    while (at !== null && !walked.has(at)) {
      if (at === PROPERTY_ROOT) {
        if (slug !== PROPERTY_ROOT) found.add(slug)
        break
      }
      walked.add(at)
      const above: Value | undefined = types.get(at)
      at = above === undefined ? null : slugAt(above, "extendsSlug")
    }
  }
  return found
}

// A PROPERTY'S NAME AS THIS TREE WRITES IT, bare where one page carries the slug and `kind/slug`
// where two do, so the tree shows the shorter name wherever the shorter name is unambiguous. This
// says how a property is named here and not which names reach it — `reachOver` says that.
function namingOver(held: readonly Held[]): (kind: string, slug: string) => string {
  const carried = new Map<string, number>()
  for (const one of held) carried.set(one.slug, (carried.get(one.slug) ?? 0) + 1)
  return (kind, slug) => ((carried.get(slug) ?? 0) > 1 ? `${kind}/${slug}` : slug)
}

// EITHER NAME REACHES A PROPERTY, the bare slug or `kind/slug`, which is the grammar `reaches`
// already holds every other relation value to. What broke here was keying what is accepted off
// how many pages carry the slug today: a declaration is written qualified while the slug is
// doubled, and a later landing that drops the double leaves that name written and still correct.
// So every landing that de-duplicated a property slug made each declaration naming it a refusal
// here, and the count grew with the cleanup rather than with any bad declaration. A qualified
// name that narrows to two pages is refused rather than resolved to one of them.
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

// THE TYPE DRAWN BESIDE A PROPERTY rather than above it, as an expression over the kinds: the kind
// a property is, what it points at where it points at something, the bound where the declaration
// carries one, and `| none` where the declaration does not require it. The declaring page type
// holds `many`, `max` and `required`; the property page holds the rest. So this takes both, and a
// property declared twice under different bounds says so under each type that declares it.
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
    types.push({
      at: atOf(one.path),
      values: { slug, "extends-slug": slugAt(one.value, "extendsSlug") ?? NO_PARENT },
    })
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

  // NO DOMAIN ROWS, because the group had no counterpart here. In the markdown corpus a domain page
  // slugged `page-property-type-<kind>` said where a kind's node opens a document; in akasha a kind
  // is a page type, so `types` already carries the path of the page defining it and the tree opens
  // a kind node from there. The group was answered empty for as long as it stood, and inventing a
  // domain slug to fill it would have put a page slug in this answer that no page carries.
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

// SPAWNED AS A CHILD OF ITS OWN rather than asked of the held-open verb server, because reading the
// whole index costs enough that a call standing behind this one waits on it: a read measured at
// 12ms alone took 2402ms behind this tree and the domain tree. So this file answers when it is the
// file that was run, filling what it is given the way the command line fills it.
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
  for (const one of answer.report) process.stdout.write(`${one}\n`)
  for (const one of answer.refusals) process.stderr.write(`${one}\n`)
  process.exitCode = answer.code
}
