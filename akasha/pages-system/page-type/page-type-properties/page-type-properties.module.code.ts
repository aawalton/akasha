import {
  numberAt,
  textAt,
  type Value,
} from "../../indexes/index-entries/index-entries.module.code.ts"
import { schemaOf, standingAt } from "../../indexes/index-reading/index-reading.module.code.ts"
import type { Reading } from "../../indexes/index-surface/index-surface.module.code.ts"
import { slugIn } from "../../page/page-address/page-address.module.code.ts"
import { exportedAs } from "../../page/page-export-name/page-export-name.module.code.ts"

const PAGE_TYPE = "page-type"

const DECLARED = "properties"

const SAID = "pagePropertySlug"

const EXTENDS = "extendsSlug"

export type Carried = {
  readonly pagePropertySlug: string
  readonly pageTypeSlug: string
  readonly propertySlug: string
  readonly key: string
  readonly declaredBy: string
  readonly required: boolean
  readonly many: boolean
  readonly max: number | null
  readonly total: number | null
  readonly uncommitted: boolean
  readonly secret: boolean
}

export function identityOf(one: Carried): string {
  return `${one.pageTypeSlug}/${one.pagePropertySlug}`
}

export function pageAt(
  given: string | Reading,
  pageTypeSlug: string,
  slug: string,
  pageOf: (path: string) => Value | null
): Value | null {
  const standing = standingAt(given, pageTypeSlug, slug)
  const one = standing.length === 1 ? standing[0] : undefined
  return one === undefined ? null : pageOf(one.path)
}

export function carriedIn(
  value: Value,
  given: string | Reading,
  declaredBy: string
): readonly Carried[] {
  const carried: Carried[] = []
  const declared = value[DECLARED]
  for (const entry of Array.isArray(declared) ? declared : []) {
    if (typeof entry !== "object" || entry === null || Array.isArray(entry)) continue
    const one = entry as Value
    const said = textAt(one, SAID)
    if (said === null) continue
    const bare = slugIn(said)
    if (bare === null) continue
    const filed = schemaOf(given, said)
    if ("refused" in filed) continue
    const { pageTypeSlug, propertySlug } = filed.schema
    if (propertySlug === null) continue
    carried.push({
      pagePropertySlug: bare,
      pageTypeSlug,
      propertySlug,
      key: exportedAs(propertySlug),
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

export function declarationsOf(
  pageTypeSlug: string,
  given: string | Reading,
  pageOf: (path: string) => Value | null
): readonly Carried[] {
  const carried: Carried[] = []
  const walked = new Set<string>()
  let here: string | null = pageTypeSlug
  while (here !== null && !walked.has(here)) {
    const own: string = here
    walked.add(own)
    const value = pageAt(given, PAGE_TYPE, own, pageOf)
    if (value === null) break
    carried.push(...carriedIn(value, given, own))
    const above = textAt(value, EXTENDS)
    here = above === null ? null : slugIn(above)
  }
  return carried
}

export function propertiesOf(
  pageTypeSlug: string,
  given: string | Reading,
  pageOf: (path: string) => Value | null
): readonly Carried[] {
  const carried: Carried[] = []
  const bound = new Set<string>()
  for (const one of declarationsOf(pageTypeSlug, given, pageOf)) {
    const identity = identityOf(one)
    if (bound.has(identity)) continue
    bound.add(identity)
    carried.push(one)
  }
  return carried
}
