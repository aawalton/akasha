import {
  pageTypesIn,
  valueAt,
  valueIn,
  type Value,
} from "../../../pages-system/index/index-entries.module.code.ts"
import { indexIn, schemaOf, standingAt } from "../../../pages-system/index/index-reading.module.code.ts"
import { addressIn } from "../../../pages-system/page/page-address.module.code.ts"
import { pageNamed } from "../../../pages-system/page/page-file-name.module.code.ts"
import { slugFor } from "../../../pages-system/page-property/page-property-key.module.code.ts"
import type { Body } from "../../checking.module.code.ts"
import { bodyOf } from "../../checking.module.code.ts"
import type { Judged, Leaving } from "../../judging.module.code.ts"

const INSIDE = "akasha/"

const PAGE_TYPE = "page-type"

const TEXT = "text-property"

const RECORD = "record-property"

const DECLARED = "properties"

const SAID = "pagePropertySlug"

export type Declared = {
  readonly required: boolean
  readonly many: boolean
  readonly max: number | null
  readonly total: number | null
}

export type Reading = (pageTypeSlug: string, slug: string) => Value | null

function wordAt(held: Record<string, unknown>, key: string): string | null {
  const said = held[key]
  return typeof said === "string" ? said : null
}

function countAt(held: Record<string, unknown>, key: string): number | null {
  const said = held[key]
  return typeof said === "number" ? said : null
}

function entriesAt(held: Record<string, unknown>, key: string): readonly Record<string, unknown>[] {
  const said = held[key]
  if (!Array.isArray(said)) return []
  const kept: Record<string, unknown>[] = []
  for (const one of said) {
    if (typeof one === "object" && one !== null && !Array.isArray(one)) {
      kept.push(one as Record<string, unknown>)
    }
  }
  return kept
}

function declaredAt(held: Record<string, unknown>): Declared {
  return {
    required: held["required"] === true,
    many: held["many"] === true,
    max: countAt(held, "max"),
    total: countAt(held, "total"),
  }
}

export function slugOf(named: string): string | null {
  const address = addressIn(named)
  return address.kind === "id" ? null : address.slug
}

export function declaredFor(
  pageTypeSlug: string,
  read: Reading
): ReadonlyMap<string, Declared> {
  const found = new Map<string, Declared>()
  const walked = new Set<string>()
  let here: string | null = pageTypeSlug
  while (here !== null && !walked.has(here)) {
    walked.add(here)
    const value = read(PAGE_TYPE, here)
    if (value === null) break
    for (const one of entriesAt(value, DECLARED)) {
      const slug = wordAt(one, SAID)
      if (slug === null || found.has(slug)) continue
      found.set(slug, declaredAt(one))
    }
    const above = wordAt(value, "extendsSlug")
    here = above === null ? null : slugOf(above)
  }
  return found
}

function overMax(said: unknown, max: number | null, slug: string, where: string): string | null {
  if (typeof said !== "string" || max === null) return null
  if (said.length <= max) return null
  return `${where}\`${slug}\` runs to ${said.length} characters, over the max of ${max}`
}

function overTotal(held: readonly unknown[], total: number | null, slug: string): string | null {
  if (total === null) return null
  let sum = 0
  for (const one of held) if (typeof one === "string") sum += one.length
  if (sum <= total) return null
  return `holds ${sum} characters of \`${slug}\`, over the total of ${total}`
}

export function reasonsIn(
  value: Value,
  declared: ReadonlyMap<string, Declared>,
  property: (slug: string) => Value | null,
  named: string
): readonly string[] {
  const said: string[] = []
  for (const [slug, one] of declared) {
    if (!one.required) continue
    const key = slug.replace(/-([a-z0-9])/g, (_, ch: string) => ch.toUpperCase())
    if (!(key in value)) said.push(`does not state \`${slug}\`, which \`${named}\` requires`)
  }
  for (const [key, held] of Object.entries(value)) {
    const slug = slugFor(key)
    const one = declared.get(slug)
    if (one === undefined) {
      said.push(`states \`${key}\`, which \`${named}\` does not declare`)
      continue
    }
    const listed = Array.isArray(held)
    if (one.many && !listed) said.push(`states \`${slug}\` singly, and \`${named}\` declares it many`)
    if (!one.many && listed) said.push(`states \`${slug}\` as a list, and \`${named}\` declares it single`)
    if (one.many && listed && one.max !== null && held.length > one.max) {
      said.push(`holds ${held.length} of \`${slug}\`, over the max of ${one.max}`)
    }
    if (one.many && listed) {
      const why = overTotal(held, one.total, slug)
      if (why !== null) said.push(why)
    }
    const page = property(slug)
    if (page === null) continue
    const shape = wordAt(page, "pageTypeSlug")
    if (shape === TEXT) {
      const max = countAt(page, "max")
      for (const each of listed ? held : [held]) {
        const why = overMax(each, max, slug, "")
        if (why !== null) said.push(why)
      }
      continue
    }
    if (shape !== RECORD) continue
    const fields = new Map<string, Declared>()
    for (const each of entriesAt(page, DECLARED)) {
      const field = wordAt(each, SAID)
      if (field !== null) fields.set(field, declaredAt(each))
    }
    for (const entry of listed ? entriesAt(value, key) : [held]) {
      if (typeof entry !== "object" || entry === null) continue
      for (const [inner, value_] of Object.entries(entry as Record<string, unknown>)) {
        const field = slugFor(inner)
        const shaped = fields.get(field)
        if (shaped === undefined) {
          said.push(`states \`${slug} ${inner}\`, which \`${slug}\` does not declare`)
          continue
        }
        const held_ = property(field)
        const max = held_ === null ? null : countAt(held_, "max")
        const many = Array.isArray(value_)
        if (shaped.many && many && shaped.max !== null && value_.length > shaped.max) {
          said.push(`holds ${value_.length} of \`${slug} ${field}\`, over the max of ${shaped.max}`)
        }
        if (shaped.many && many) {
          const why = overTotal(value_, shaped.total, `${slug} ${field}`)
          if (why !== null) said.push(why)
        }
        for (const each of many ? value_ : [value_]) {
          const why = overMax(each, max, `${slug} ${field}`, "")
          if (why !== null) said.push(why)
        }
      }
    }
  }
  return said
}

export function pageMatchesItsType(leaving: Leaving): readonly Judged[] {
  const index = indexIn(leaving.root)
  const pageTypes = pageTypesIn(index)
  const held = new Map<string, Value | null>()
  const read: Reading = (pageTypeSlug, slug) => {
    const at = `${pageTypeSlug}/${slug}`
    const found = held.get(at)
    if (found !== undefined) return found
    const standing = standingAt(leaving.root, pageTypeSlug, slug)
    const one = standing.length === 1 ? standing[0] : undefined
    let value: Value | null = null
    if (one !== undefined) {
      const bytes = leaving.at(one.path)
      if (bytes === null) value = valueAt(one.path, leaving.root)
      else {
        const given: Body = { root: leaving.root, path: one.path, bytes }
        const text = bodyOf(given)
        value = text === null ? null : valueIn(text)
      }
    }
    held.set(at, value)
    return value
  }
  const property = (slug: string): Value | null => {
    const schema = schemaOf(leaving.root, slug)
    return schema === null ? null : read(schema.pageTypeSlug, slug)
  }
  const judged: Judged[] = []
  for (const path of leaving.changed) {
    if (!path.startsWith(INSIDE)) continue
    if (!pageNamed(path, pageTypes)) continue
    const bytes = leaving.at(path)
    if (bytes === null) continue
    const given: Body = { root: leaving.root, path, bytes }
    const text = bodyOf(given)
    if (text === null) continue
    const value = valueIn(text)
    if (value === null) continue
    const pageTypeSlug = wordAt(value, "pageTypeSlug")
    if (pageTypeSlug === null) continue
    const declared = declaredFor(pageTypeSlug, read)
    if (declared.size === 0) continue
    const named = `${PAGE_TYPE}/${pageTypeSlug}`
    for (const reason of reasonsIn(value, declared, property, named)) {
      judged.push({ path, reason })
    }
  }
  return judged
}
