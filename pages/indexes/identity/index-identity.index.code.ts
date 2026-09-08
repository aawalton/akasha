import { join } from "node:path"
import { partedIn } from "@akasha/pages/page-file-name"
import { slugFor } from "@akasha/pages/page-property-key"
import type { Identifying } from "@akasha/pages/page-type-properties"
import { textAt, textsAt, type Value } from "@akasha/pages/page-value"
import {
  type Entry,
  type Identifier,
  type ScopedBy,
  under,
} from "../entries/index-entries.module.code.ts"
import { indexIdentity } from "./index-identity.index.ts"

const IDENTITY = indexIdentity.name

const ENDING = ".jsonl"

const PAGE_TYPE = "page-type"

const PART_OF = "part-of"

const PAGE = "page"

const PAGE_PROPERTY = "page-property"

const PART_OF_SLUGS = "partOfSlugs"

const PART_SLUGS = "partSlugs"

const QUALIFIES = "/"

const PART_SLUGS_FILED = slugFor(PART_SLUGS)

export type PartOf = (value: Value) => readonly string[]

export type Naming = (
  id: string
) => readonly { readonly path: string; readonly propertySlug: string }[]

function slugIn(address: string): string {
  const at = address.lastIndexOf(QUALIFIES)
  return at === -1 ? address : address.slice(at + 1)
}

export const partOfStated: PartOf = (value) => (textsAt(value, PART_OF_SLUGS) ?? []).map(slugIn)

function noting(held: Map<string, string[]>, named: string, slug: string): undefined {
  const found = held.get(named)
  if (found === undefined) held.set(named, [slug])
  else if (!found.includes(slug)) found.push(slug)
}

function namingIn(
  value: Value,
  qualified: ReadonlyMap<string, readonly string[]>,
  bare: ReadonlyMap<string, readonly string[]>
): readonly string[] {
  const slug = textAt(value, "slug")
  const pageTypeSlug = textAt(value, "pageTypeSlug")
  const id = textAt(value, "id")
  const found: string[] = []
  if (slug !== null && pageTypeSlug !== null) {
    found.push(...(qualified.get(`${pageTypeSlug}${QUALIFIES}${slug}`) ?? []))
  }
  if (slug !== null) found.push(...(bare.get(slug) ?? []))
  if (id !== null) found.push(...(bare.get(id) ?? []))
  return found
}

export function partingIn(values: Iterable<Value>): PartOf {
  const qualified = new Map<string, string[]>()
  const bare = new Map<string, string[]>()
  for (const value of values) {
    const slug = textAt(value, "slug")
    if (slug === null) continue
    for (const named of textsAt(value, PART_SLUGS) ?? []) {
      noting(named.includes(QUALIFIES) ? qualified : bare, named, slug)
    }
  }
  return (value) => {
    const found = [...partOfStated(value)]
    for (const one of namingIn(value, qualified, bare)) {
      if (!found.includes(one)) found.push(one)
    }
    return found
  }
}

export function partingOver(
  naming: Naming,
  values: Iterable<Value>,
  carried: ReadonlySet<string>
): PartOf {
  const among = partingIn(values)
  const held = new Map<string, readonly string[]>()
  const namedBy = (id: string): readonly string[] => {
    const found = held.get(id)
    if (found !== undefined) return found
    const said: string[] = []
    for (const one of naming(id)) {
      if (one.propertySlug !== PART_SLUGS_FILED || carried.has(one.path)) continue
      const slug = partedIn(one.path)?.slug ?? null
      if (slug !== null && !said.includes(slug)) said.push(slug)
    }
    held.set(id, said)
    return said
  }
  return (value) => {
    const found = [...among(value)]
    const id = textAt(value, "id")
    for (const one of id === null ? [] : namedBy(id)) {
      if (!found.includes(one)) found.push(one)
    }
    return found
  }
}

const NO_SCOPE = ""

function scopedIn(
  scopedBy: ScopedBy | undefined,
  value: Value,
  pageTypeSlug: string
): readonly string[] {
  if (scopedBy === undefined) {
    throw new Error(`\`${pageTypeSlug}\` names no property a unique value of it is scoped by`)
  }
  const said = textAt(value, scopedBy.key)
  if (said === null) return []
  return [join(pageTypeSlug, scopedBy.pagePropertySlug, slugIn(said))]
}

function scopesFor(
  one: Identifier,
  value: Value,
  pageTypeSlug: string,
  partOf: PartOf
): readonly string[] {
  const uniqueKind = one.uniqueKind
  if (uniqueKind === PAGE) return [NO_SCOPE]
  if (uniqueKind === PAGE_TYPE) return [pageTypeSlug]
  if (uniqueKind === PART_OF) return partOf(value)
  if (uniqueKind === PAGE_PROPERTY) return scopedIn(one.scopedBy, value, pageTypeSlug)
  throw new Error(`\`${uniqueKind}\` is no unique kind a page is filed under`)
}

export type Filed = {
  readonly uniqueKind: string
  readonly scope: string
  readonly propertySlug: string
  readonly said: string
}

export function keyFor(one: Filed): string {
  return join(one.uniqueKind, one.scope, one.propertySlug, one.said)
}

export function filedIn(
  value: Value,
  identifying: Identifying,
  only: ReadonlySet<string> | null = null,
  partOf: PartOf = partOfStated
): readonly Filed[] {
  const id = textAt(value, "id")
  const slug = textAt(value, "slug")
  const pageTypeSlug = textAt(value, "pageTypeSlug")
  if (id === null || slug === null || pageTypeSlug === null) return []
  const held: Filed[] = []
  for (const [propertySlug, one] of identifying(pageTypeSlug)) {
    if (only !== null && !only.has(propertySlug)) continue
    const found = value[one.key]
    if (typeof found !== "string" && typeof found !== "number") continue
    const said = String(found)
    const uniqueKind = one.uniqueKind
    for (const scope of scopesFor(one, value, pageTypeSlug, partOf)) {
      held.push({ uniqueKind, scope, propertySlug, said })
    }
  }
  return held
}

export function identityIn(
  value: Value,
  path: string,
  repo: string,
  identifying: Identifying,
  only: ReadonlySet<string> | null = null,
  partOf: PartOf = partOfStated
): readonly Entry[] {
  const id = textAt(value, "id")
  if (id === null) return []
  const line = JSON.stringify({ path: under(repo, path), id })
  return filedIn(value, identifying, only, partOf).map((one) => ({
    at: join(IDENTITY, `${keyFor(one)}${ENDING}`),
    line,
  }))
}
