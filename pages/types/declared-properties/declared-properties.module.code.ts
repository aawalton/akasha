import { listedAt, schemaOf } from "@akasha/indexes"
import type { Identifier, ScopedBy } from "@akasha/indexes/entries"
import type { Reading, Schema } from "@akasha/indexes/shape"
import { addressIn, slugIn } from "../../address/page-address.module.code.ts"
import { exportedAs } from "../../export-name/page-export-name.module.code.ts"
import {
  numberAt,
  slugAt,
  slugsIn,
  textAt,
  type Value,
} from "../../value/page-value.module.code.ts"
import { kindsUnder } from "../descent/page-type-descent.module.code.ts"

const PAGE_TYPE = "page-type"

const DECLARED = "properties"

const SAID = "pagePropertySlug"

const EXTENDS = "extends"

const UNIQUE_PROPERTY = "uniqueProperty"

const TARGET_PAGE_TYPE = "targetPageType"

export type Carried = {
  readonly pagePropertySlug: string
  readonly pageTypeSlug: string
  readonly propertySlug: string
  readonly key: string
  readonly unique: string | null
  readonly uniquePropertySlug?: string
  readonly declaredBy: string
  readonly required: boolean
  readonly many: boolean
  readonly maxCount: number | null
  readonly maxLength: number | null
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

function aboveIn(value: Value): readonly string[] {
  return slugsIn(value[EXTENDS])
}

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
    return value === null ? [] : [{ id: each.id, value }]
  })
  const only = read[0]
  if (only === undefined) return null
  return read.every((each) => each.id === only.id) ? only.value : null
}

export function sourceIn(given: string | Reading, pageOf: (path: string) => Value | null): Source {
  let under: readonly string[] | null = null
  const typing = (): readonly string[] => {
    if (under === null) under = [...kindsUnder(PAGE_TYPE, given, pageOf)]
    return under
  }
  return {
    pageTypeAt: (slug) => {
      for (const one of typing()) {
        const value = pageAt(given, one, slug, pageOf)
        if (value !== null) return value
      }
      return null
    },
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
    const scoped = slugAt(one, UNIQUE_PROPERTY) ?? schema.uniquePropertySlug
    carried.push({
      pagePropertySlug: bare,
      pageTypeSlug,
      propertySlug,
      key: exportedAs(propertySlug),
      unique: slugAt(one, "unique") ?? schema.unique,
      uniquePropertySlug: scoped === null ? undefined : scoped,
      declaredBy,
      required: one["required"] === true,
      many: one["many"] === true,
      maxCount: numberAt(one, "maxCount"),
      maxLength: numberAt(one, "maxLength"),
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

const declaredBySlug = new WeakMap<Source, Map<string, readonly Carried[]>>()

function declaredFor(value: Value, source: Source, own: string): readonly Carried[] {
  let held = declaredBySlug.get(source)
  if (held === undefined) {
    held = new Map()
    declaredBySlug.set(source, held)
  }
  const found = held.get(own)
  if (found !== undefined) return found
  const made = carriedFrom(value, source, own)
  held.set(own, made)
  return made
}

export function declarationsIfNamed(
  pageTypeSlug: string,
  source: Source
): readonly Carried[] | null {
  const carried: Carried[] = []
  const walked = new Set<string>()
  const waiting: string[] = [pageTypeSlug]
  for (let at = 0; at < waiting.length; at += 1) {
    const own = waiting[at]
    if (own === undefined || walked.has(own)) continue
    walked.add(own)
    const value = source.pageTypeAt(own)
    if (value === null) return null
    carried.push(...declaredFor(value, source, own))
    for (const above of [...aboveIn(value)].reverse()) waiting.push(above)
  }
  return carried
}

function unreadable(pageTypeSlug: string, source: Source): string {
  const walked = new Set<string>()
  const waiting: (readonly string[])[] = [[pageTypeSlug]]
  for (let at = 0; at < waiting.length; at += 1) {
    const route = waiting[at]
    if (route === undefined) continue
    const own = route[route.length - 1]
    if (own === undefined || walked.has(own)) continue
    walked.add(own)
    const value = source.pageTypeAt(own)
    if (value === null) {
      return own === pageTypeSlug
        ? `\`${pageTypeSlug}\` names no page type here, so what it carries cannot be read`
        : `\`${pageTypeSlug}\` reaches \`${own}\` by extending, through ${route.join(" -> ")}, and \`${own}\` names no page type here`
    }
    for (const above of [...aboveIn(value)].reverse()) waiting.push([...route, above])
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

function scopingIn(carried: readonly Carried[], said: string | undefined): ScopedBy | null {
  const bare = said === undefined ? null : slugIn(said)
  if (bare === null) return null
  for (const one of carried) {
    if (one.pagePropertySlug !== bare) continue
    return { key: one.key, pagePropertySlug: one.pagePropertySlug }
  }
  return null
}

export function identifyingFrom(source: Source): Identifying {
  const held = new Map<string, ReadonlyMap<string, Identifier>>()
  return (pageTypeSlug) => {
    const found = held.get(pageTypeSlug)
    if (found !== undefined) return found
    const carried = propertiesIfNamed(pageTypeSlug, source) ?? []
    const made = new Map<string, Identifier>()
    for (const one of carried) {
      if (one.unique === null) continue
      const scopedBy = scopingIn(carried, one.uniquePropertySlug)
      made.set(
        one.pagePropertySlug,
        scopedBy === null
          ? { key: one.key, uniqueKind: one.unique }
          : { key: one.key, uniqueKind: one.unique, scopedBy }
      )
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
    if ((textAt(value, "type") ?? textAt(value, "pageTypeSlug")) !== PAGE_TYPE) continue
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
    const pageTypeSlug = textAt(value, "type") ?? textAt(value, "pageTypeSlug")
    const slug = textAt(value, "slug")
    if (pageTypeSlug === null || slug === null) continue
    if (pageTypeSlug === PAGE_TYPE) types.set(slug, value)
    const propertySlug = textAt(value, "propertySlug")
    if (propertySlug === null) continue
    schemas.set(`${pageTypeSlug}/${slug}`, {
      pageTypeSlug,
      targetPageTypeSlug: slugAt(value, TARGET_PAGE_TYPE),
      unique: slugAt(value, "unique"),
      uniquePropertySlug: slugAt(value, UNIQUE_PROPERTY),
      slug,
      propertySlug,
      fileName: textAt(value, "fileName"),
      folderName: textAt(value, "folderName"),
    })
  }
  return {
    pageTypeAt: (slug) => types.get(slug) ?? null,
    schemaFor: (said) => schemaAmong(schemas, said),
  }
}
