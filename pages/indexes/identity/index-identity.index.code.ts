import { join } from "node:path"
import type { Identifying } from "@akasha/pages-system/page-type-properties"
import { textAt, textsAt, type Value } from "@akasha/pages-system/page-value"
import { type Entry, under } from "../entries/index-entries.module.code.ts"
import { indexIdentity } from "./index-identity.index.ts"

const IDENTITY = indexIdentity.name

const ENDING = ".jsonl"

const ALWAYS = "always"

const PAGE_TYPE = "page-type"

const PART_OF = "part-of"

const PAGE = "page"

const PART_OF_SLUGS = "partOfSlugs"

function slugIn(address: string): string {
  const at = address.lastIndexOf("/")
  return at === -1 ? address : address.slice(at + 1)
}

function scopesFor(reach: string, value: Value, pageTypeSlug: string): readonly string[] {
  if (reach === ALWAYS) return [PAGE]
  if (reach === PAGE_TYPE) return [pageTypeSlug]
  if (reach === PART_OF) return (textsAt(value, PART_OF_SLUGS) ?? []).map(slugIn)
  throw new Error(`\`${reach}\` is no reach a page is filed under`)
}

export type Filed = {
  readonly scope: string
  readonly propertySlug: string
  readonly said: string
}

export function filedIn(
  value: Value,
  identifying: Identifying,
  only: ReadonlySet<string> | null = null
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
    for (const scope of scopesFor(one.reach, value, pageTypeSlug)) {
      held.push({ scope, propertySlug, said })
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
    at: join(IDENTITY, one.scope, one.propertySlug, `${one.said}${ENDING}`),
    line,
  }))
}
