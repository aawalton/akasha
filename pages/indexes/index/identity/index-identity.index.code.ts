import { join } from "node:path"
import type { Identifying } from "@akasha/pages-system/page-type-properties"
import { textAt, type Value } from "@akasha/pages-system/page-value"
import { type Entry, under } from "../../index-entries/index-entries.module.code.ts"
import { indexIdentity } from "./index-identity.index.ts"

const IDENTITY = indexIdentity.name

const ENDING = ".jsonl"

const ALWAYS = "always"

const PAGE = "page"

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
    held.push({ scope: one.reach === ALWAYS ? PAGE : pageTypeSlug, propertySlug, said })
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
