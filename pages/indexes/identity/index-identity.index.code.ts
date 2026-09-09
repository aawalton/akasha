import { join } from "node:path"
import type { Identifying } from "@akasha/pages/page-type-properties"
import { textAt, type Value } from "@akasha/pages/page-value"
import type { Entry, Identifier, ScopedBy } from "../entries/index-entries.module.code.ts"
import { under } from "../path-claiming/path-claiming.module.code.ts"
import { indexIdentity } from "./index-identity.index.ts"

const IDENTITY = indexIdentity.name

const ENDING = ".jsonl"

const PAGE_TYPE = "page-type"

const PAGE = "page"

const PAGE_PROPERTY = "page-property"

const QUALIFIES = "/"

function slugIn(address: string): string {
  const at = address.lastIndexOf(QUALIFIES)
  return at === -1 ? address : address.slice(at + 1)
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

function scopesFor(one: Identifier, value: Value, pageTypeSlug: string): readonly string[] {
  const uniqueKind = one.uniqueKind
  if (uniqueKind === PAGE) return [NO_SCOPE]
  if (uniqueKind === PAGE_TYPE) return [pageTypeSlug]
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
  only: ReadonlySet<string> | null = null
): readonly Filed[] {
  const id = textAt(value, "id")
  const slug = textAt(value, "slug")
  const pageTypeSlug = textAt(value, "type") ?? textAt(value, "pageTypeSlug")
  if (id === null || slug === null || pageTypeSlug === null) return []
  const held: Filed[] = []
  for (const [propertySlug, one] of identifying(pageTypeSlug)) {
    if (only !== null && !only.has(propertySlug)) continue
    const found = value[one.key]
    if (typeof found !== "string" && typeof found !== "number") continue
    const said = String(found)
    const uniqueKind = one.uniqueKind
    for (const scope of scopesFor(one, value, pageTypeSlug)) {
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
  only: ReadonlySet<string> | null = null
): readonly Entry[] {
  const id = textAt(value, "id")
  if (id === null) return []
  const line = JSON.stringify({ path: under(repo, path), id })
  return filedIn(value, identifying, only).map((one) => ({
    at: join(IDENTITY, `${keyFor(one)}${ENDING}`),
    line,
  }))
}
