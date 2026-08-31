import {
  numberAt,
  textAt,
  type Value,
} from "../../indexes/index-entries/index-entries.module.code.ts"
import {
  type Schema,
  schemaOf,
  standingAt,
} from "../../indexes/index-reading/index-reading.module.code.ts"
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

export function declarationsFrom(pageTypeSlug: string, source: Source): readonly Carried[] {
  const carried: Carried[] = []
  const walked = new Set<string>()
  let here: string | null = pageTypeSlug
  while (here !== null && !walked.has(here)) {
    const own: string = here
    walked.add(own)
    const value = source.pageTypeAt(own)
    if (value === null) break
    carried.push(...carriedFrom(value, source, own))
    const above = textAt(value, EXTENDS)
    here = above === null ? null : slugIn(above)
  }
  return carried
}

export function propertiesFrom(pageTypeSlug: string, source: Source): readonly Carried[] {
  const carried: Carried[] = []
  const bound = new Set<string>()
  for (const one of declarationsFrom(pageTypeSlug, source)) {
    const identity = identityOf(one)
    if (bound.has(identity)) continue
    bound.add(identity)
    carried.push(one)
  }
  return carried
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
