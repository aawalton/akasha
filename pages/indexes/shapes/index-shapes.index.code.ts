import { join } from "node:path"
import type { Entry } from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import type { Shape } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import { indexShapes } from "akasha/pages/indexes/shapes/index-shapes.index.ts"
import {
  type Carried,
  propertiesIfNamed,
  type Source,
} from "akasha/pages/types/declared-properties/declared-properties.module.code.ts"
import {
  numberAt,
  slugAt,
  textAt,
  type Value,
} from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const SHAPES = indexShapes.name

const PAGE_TYPE = "page-type"

const ENDING = ".jsonl"

const NAMES = "/"

export type Carrying = {
  readonly key: string
  readonly propertySlug: string
  readonly pagePropertySlug: string
  readonly pageTypeSlug: string
  readonly declaredBy: string
  readonly required: boolean
  readonly many: boolean
  readonly unique: string | null
  readonly uniquePropertySlug: string | null
  readonly maxCount: number | null
  readonly maxLength: number | null
  readonly fixed: string | null
  readonly uncommitted: boolean
  readonly secret: boolean
  readonly targetPageTypeSlug: string | null
  readonly fileName: string | null
  readonly folderName: string | null
}

export function fileFor(pageTypeSlug: string): string {
  return join(SHAPES, PAGE_TYPE, `${pageTypeSlug}${ENDING}`)
}

export function carryingIn(line: string): Carrying | null {
  let said: unknown
  try {
    said = JSON.parse(line)
  } catch {
    return null
  }
  if (said === null || typeof said !== "object" || Array.isArray(said)) return null
  const held = said as Value
  const key = textAt(held, "key")
  const propertySlug = textAt(held, "propertySlug")
  const pagePropertySlug = textAt(held, "pagePropertySlug")
  const pageTypeSlug = textAt(held, "pageTypeSlug")
  const declaredBy = textAt(held, "declaredBy")
  if (key === null || propertySlug === null || pagePropertySlug === null) return null
  if (pageTypeSlug === null || declaredBy === null) return null
  return {
    key,
    propertySlug,
    pagePropertySlug,
    pageTypeSlug,
    declaredBy,
    required: held.required === true,
    many: held.many === true,
    unique: textAt(held, "unique"),
    uniquePropertySlug: textAt(held, "uniquePropertySlug"),
    maxCount: numberAt(held, "maxCount"),
    maxLength: numberAt(held, "maxLength"),
    fixed: textAt(held, "fixed"),
    uncommitted: held.uncommitted === true,
    secret: held.secret === true,
    targetPageTypeSlug: textAt(held, "targetPageTypeSlug"),
    fileName: textAt(held, "fileName"),
    folderName: textAt(held, "folderName"),
  }
}

function carryingOf(one: Carried, shape: Shape | undefined): Carrying {
  return {
    key: one.key,
    propertySlug: one.propertySlug,
    pagePropertySlug: one.pagePropertySlug,
    pageTypeSlug: one.pageTypeSlug,
    declaredBy: one.declaredBy,
    required: one.required,
    many: one.many,
    unique: one.unique,
    uniquePropertySlug: one.uniquePropertySlug ?? null,
    maxCount: one.maxCount,
    maxLength: one.maxLength,
    fixed: one.fixed ?? null,
    uncommitted: one.uncommitted,
    secret: one.secret,
    targetPageTypeSlug: shape?.targetPageTypeSlug ?? null,
    fileName: shape?.fileName ?? null,
    folderName: shape?.folderName ?? null,
  }
}

export function shapesIn(values: Iterable<Value>): ReadonlyMap<string, Shape> {
  const found = new Map<string, Shape>()
  for (const value of values) {
    const pageTypeSlug = textAt(value, "type") ?? textAt(value, "pageTypeSlug")
    const slug = textAt(value, "slug")
    const propertySlug = textAt(value, "propertySlug")
    if (pageTypeSlug === null || slug === null || propertySlug === null) continue
    const named = `${pageTypeSlug}${NAMES}${slug}`
    if (found.has(named)) continue
    found.set(named, {
      pageTypeSlug,
      targetPageTypeSlug: slugAt(value, "targetPageType"),
      unique: slugAt(value, "unique"),
      uniquePropertySlug: slugAt(value, "uniqueProperty"),
      slug,
      propertySlug,
      fileName: textAt(value, "fileName"),
      folderName: textAt(value, "folderName"),
    })
  }
  return found
}

export function pageTypeSlugsIn(values: Iterable<Value>): readonly string[] {
  const found: string[] = []
  for (const value of values) {
    if ((textAt(value, "type") ?? textAt(value, "pageTypeSlug")) !== PAGE_TYPE) continue
    const slug = textAt(value, "slug")
    if (slug !== null) found.push(slug)
  }
  return found
}

export function shapesFiled(
  source: Source,
  shapes: ReadonlyMap<string, Shape>,
  pageTypeSlugs: Iterable<string>
): readonly Entry[] {
  const found: Entry[] = []
  for (const pageTypeSlug of new Set(pageTypeSlugs)) {
    const carried = propertiesIfNamed(pageTypeSlug, source)
    if (carried === null) continue
    const at = fileFor(pageTypeSlug)
    for (const one of carried) {
      const shape = shapes.get(`${one.pageTypeSlug}${NAMES}${one.pagePropertySlug}`)
      found.push({ at, line: JSON.stringify(carryingOf(one, shape)) })
    }
  }
  return found
}
