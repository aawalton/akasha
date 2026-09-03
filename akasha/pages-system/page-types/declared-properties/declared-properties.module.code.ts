import { listedAt, type Schema, schemaOf } from "@akasha/indexes"
import type { Identifier } from "@akasha/indexes/entries"
import type { Reading } from "@akasha/indexes/shape"
import { addressIn, slugIn } from "../../pages/address/page-address.module.code.ts"
import { exportedAs } from "../../pages/export-name/page-export-name.module.code.ts"
import { numberAt, slugAt, textAt, type Value } from "../../pages/value/page-value.module.code.ts"

const PAGE_TYPE = "page-type"

const DECLARED = "properties"

const SAID = "pagePropertySlug"

const EXTENDS = "extendsSlug"

export type Carried = {
  readonly pagePropertySlug: string
  readonly pageTypeSlug: string
  readonly propertySlug: string
  readonly key: string
  readonly unique: string | null
  readonly declaredBy: string
  readonly required: boolean
  readonly many: boolean
  readonly max: number | null
  readonly total: number | null
  readonly uncommitted: boolean
  readonly secret: boolean
}

export type Source = {
  readonly pageTypeAt: (slug: string) => Value | null
  readonly schemaFor: (said: string) => Schema | null
}

export type Identifying = (pageTypeSlug: string) => ReadonlyMap<string, Identifier>

export function identityOf(one: Carried): string {
  return `${one.pageTypeSlug}/${one.pagePropertySlug}`
}

// SEVERAL PATHS UNDER ONE KEY IS NOT AN ABSENCE. This asked `listed.length === 1` and answered null
// for everything else, so a key listed twice read exactly like a key listed not at all: the walk in
// `declarationsFrom` broke and the page type came back carrying nothing. Measured 2026-09-03:
// `.git/data/index/identity/page-type/slug/story-read.jsonl` and its `story-chapter-read` sibling
// each held two lines with the SAME id, the second naming a bare root path that `e46fe627c0` had
// already deleted, and `identity/page/id/<id>.jsonl` held the same pair again — 4 files out of
// 143,510. Both page types answered 0 properties while declaring 6 and 7, and the map built through
// them dropped the `prose` sidecars on both and `chronology-anchors` on one.
//
// A listing no reader can open is no candidate, so the paths are read and the ones answering
// nothing are dropped. One left is the answer. Several left is a collision this cannot settle, and
// it refuses rather than picking, because picking would be a wrong answer nothing outside could
// see. None left is answered as absent, which `declarationsFrom` refuses on its own account.
export function pageAt(
  given: string | Reading,
  pageTypeSlug: string,
  slug: string,
  pageOf: (path: string) => Value | null
): Value | null {
  const listed = listedAt(given, pageTypeSlug, slug)
  if (listed.length === 0) return null
  const one = listed.length === 1 ? listed[0] : undefined
  if (one !== undefined) return pageOf(one.path)
  const read = listed.flatMap((each) => {
    const value = pageOf(each.path)
    return value === null ? [] : [{ path: each.path, value }]
  })
  const only = read[0]
  if (only === undefined) return null
  if (read.length === 1) return only.value
  throw new Error(
    `\`${pageTypeSlug}/${slug}\` is listed at ${read.length} paths that each carry a page, so nothing here says which one names it: ${read.map((each) => each.path).join(", ")}`
  )
}

export function sourceIn(given: string | Reading, pageOf: (path: string) => Value | null): Source {
  return {
    pageTypeAt: (slug) => pageAt(given, PAGE_TYPE, slug, pageOf),
    schemaFor: (said) => {
      const filed = schemaOf(given, said)
      return "refused" in filed ? null : filed.schema
    },
  }
}

export function carriedFrom(value: Value, source: Source, declaredBy: string): readonly Carried[] {
  const carried: Carried[] = []
  const declared = value[DECLARED]
  for (const entry of Array.isArray(declared) ? declared : []) {
    if (typeof entry !== "object" || entry === null || Array.isArray(entry)) continue
    const one = entry as Value
    const said = textAt(one, SAID)
    if (said === null) continue
    const bare = slugIn(said)
    if (bare === null) continue
    const schema = source.schemaFor(said)
    if (schema === null) continue
    const { pageTypeSlug, propertySlug } = schema
    if (propertySlug === null) continue
    carried.push({
      pagePropertySlug: bare,
      pageTypeSlug,
      propertySlug,
      key: exportedAs(propertySlug),
      unique: schema.unique,
      declaredBy,
      required: one["required"] === true,
      many: one["many"] === true,
      max: numberAt(one, "max"),
      total: numberAt(one, "total"),
      uncommitted: one["uncommitted"] === true,
      secret: one["secret"] === true,
    })
  }
  return carried
}

export function carriedIn(
  value: Value,
  given: string | Reading,
  declaredBy: string
): readonly Carried[] {
  return carriedFrom(
    value,
    sourceIn(given, () => null),
    declaredBy
  )
}

// A CHAIN THAT CANNOT BE READ REFUSES RATHER THAN ANSWERING EMPTY. The walk used to break at the
// first page type it could not read and return what it had, which for a first slug that would not
// resolve was `[]` — the very answer a page type declaring nothing gives. No caller could tell the
// two apart, so a corrupt index degraded to "declares nothing" and every property of the type went
// missing quietly. The pages-system says it outright: refuse where you cannot answer, and never
// read a missing source as an empty one.
//
// TWO READINGS, and the tolerant one is named rather than accidental. `declarationsIfNamed` answers
// null where the chain cannot be read, and the indexer asks that one because the set it rebuilds
// from is partial by its nature: `rebuiltFrom` walks pages while the types those pages name may not
// have been read yet, so a refusal there would refuse the rebuild itself. Every other caller asks
// `declarationsFrom`, which refuses. What was one silent answer is now a loud one and a quiet one
// that says in its own name which it is.
export function declarationsIfNamed(
  pageTypeSlug: string,
  source: Source
): readonly Carried[] | null {
  const carried: Carried[] = []
  const walked = new Set<string>()
  let here: string | null = pageTypeSlug
  while (here !== null && !walked.has(here)) {
    const own: string = here
    walked.add(own)
    const value = source.pageTypeAt(own)
    if (value === null) return null
    carried.push(...carriedFrom(value, source, own))
    const above = textAt(value, EXTENDS)
    here = above === null ? null : slugIn(above)
  }
  return carried
}

function unreadable(pageTypeSlug: string, source: Source): string {
  const walked: string[] = []
  let here: string | null = pageTypeSlug
  while (here !== null && !walked.includes(here)) {
    const own: string = here
    walked.push(own)
    const value = source.pageTypeAt(own)
    if (value === null) {
      return own === pageTypeSlug
        ? `\`${pageTypeSlug}\` names no page type here, so what it carries cannot be read`
        : `\`${pageTypeSlug}\` reaches \`${own}\` by extending, through ${walked.join(" -> ")}, and \`${own}\` names no page type here`
    }
    const above = textAt(value, EXTENDS)
    here = above === null ? null : slugIn(above)
  }
  return `\`${pageTypeSlug}\` cannot be read here`
}

export function declarationsFrom(pageTypeSlug: string, source: Source): readonly Carried[] {
  const carried = declarationsIfNamed(pageTypeSlug, source)
  if (carried === null) throw new Error(unreadable(pageTypeSlug, source))
  return carried
}

function boundOver(carried: readonly Carried[]): readonly Carried[] {
  const held: Carried[] = []
  const bound = new Set<string>()
  for (const one of carried) {
    const identity = identityOf(one)
    if (bound.has(identity)) continue
    bound.add(identity)
    held.push(one)
  }
  return held
}

export function propertiesIfNamed(pageTypeSlug: string, source: Source): readonly Carried[] | null {
  const carried = declarationsIfNamed(pageTypeSlug, source)
  return carried === null ? null : boundOver(carried)
}

export function propertiesFrom(pageTypeSlug: string, source: Source): readonly Carried[] {
  return boundOver(declarationsFrom(pageTypeSlug, source))
}

export function identifyingFrom(source: Source): Identifying {
  const held = new Map<string, ReadonlyMap<string, Identifier>>()
  return (pageTypeSlug) => {
    const found = held.get(pageTypeSlug)
    if (found !== undefined) return found
    const made = new Map<string, Identifier>()
    for (const one of propertiesIfNamed(pageTypeSlug, source) ?? []) {
      if (one.unique === null) continue
      made.set(one.pagePropertySlug, { key: one.key, reach: one.unique })
    }
    held.set(pageTypeSlug, made)
    return made
  }
}

export function declarationsOf(
  pageTypeSlug: string,
  given: string | Reading,
  pageOf: (path: string) => Value | null
): readonly Carried[] {
  return declarationsFrom(pageTypeSlug, sourceIn(given, pageOf))
}

export function propertiesOf(
  pageTypeSlug: string,
  given: string | Reading,
  pageOf: (path: string) => Value | null
): readonly Carried[] {
  return propertiesFrom(pageTypeSlug, sourceIn(given, pageOf))
}

// The tolerant reading in the `Of` shape, for a reader asking about a page type it did not pick.
// `reaching` answers which property a key reaches and takes null for none, so a type whose chain
// cannot be read reaches nothing there — an answer rather than a refusal, and named as such.
export function propertiesIfNamedOf(
  pageTypeSlug: string,
  given: string | Reading,
  pageOf: (path: string) => Value | null
): readonly Carried[] | null {
  return propertiesIfNamed(pageTypeSlug, sourceIn(given, pageOf))
}

function schemaAmong(schemas: ReadonlyMap<string, Schema>, said: string): Schema | null {
  const address = addressIn(said)
  if (address.kind === "qualified") {
    return schemas.get(`${address.pageTypeSlug}/${address.slug}`) ?? null
  }
  const slug = address.kind === "id" ? address.id : address.slug
  const found: Schema[] = []
  for (const one of schemas.values()) {
    if (one.slug === slug) found.push(one)
  }
  const only = found[0]
  return found.length === 1 && only !== undefined ? only : null
}

export function sourceAmong(values: readonly Value[], source: Source): Source {
  const types = new Map<string, Value>()
  for (const value of values) {
    if (textAt(value, "pageTypeSlug") !== PAGE_TYPE) continue
    const slug = textAt(value, "slug")
    if (slug !== null) types.set(slug, value)
  }
  return {
    pageTypeAt: (slug) => types.get(slug) ?? source.pageTypeAt(slug),
    schemaFor: source.schemaFor,
  }
}

export function sourceOver(values: readonly Value[]): Source {
  const types = new Map<string, Value>()
  const schemas = new Map<string, Schema>()
  for (const value of values) {
    const pageTypeSlug = textAt(value, "pageTypeSlug")
    const slug = textAt(value, "slug")
    if (pageTypeSlug === null || slug === null) continue
    if (pageTypeSlug === PAGE_TYPE) types.set(slug, value)
    const propertySlug = textAt(value, "propertySlug")
    if (propertySlug === null) continue
    schemas.set(`${pageTypeSlug}/${slug}`, {
      pageTypeSlug,
      targetPageTypeSlug: slugAt(value, "targetPageTypeSlug"),
      unique: slugAt(value, "unique"),
      slug,
      propertySlug,
      fileName: textAt(value, "fileName"),
    })
  }
  return {
    pageTypeAt: (slug) => types.get(slug) ?? null,
    schemaFor: (said) => schemaAmong(schemas, said),
  }
}
