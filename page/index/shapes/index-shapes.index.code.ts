import { join } from "node:path"
import type { Entry } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { answered, heldEach } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading, Shape } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { indexShapes } from "akasha/page/index/shapes/index-shapes.index.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  type Carried,
  propertiesIfNamed,
  type Source,
} from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"
import {
  type Carrying,
  carryingIn,
  carryingOf,
} from "akasha/page/type/modules/type-schema/type-schema.module.code.ts"
import { shapedIn } from "akasha/page/type/page-property/modules/property-shape/property-shape.module.code.ts"

const SHAPES = indexShapes.name

const PAGE_TYPE = "page-type"

const PAGE_PROPERTY = "page-property"

const ENDING = ".jsonl"

const NAMES = "/"

export function fileFor(pageTypeSlug: string): string {
  return join(SHAPES, PAGE_TYPE, `${pageTypeSlug}${ENDING}`)
}

export function shapeFileFor(pageTypeSlug: string): string {
  return join(SHAPES, PAGE_PROPERTY, `${pageTypeSlug}${ENDING}`)
}

export function shapeFiled(value: Value): readonly Entry[] {
  const one = shapedIn(value)
  if (one === null) return []
  return [{ at: shapeFileFor(one.pageTypeSlug), line: JSON.stringify(one) }]
}

function namedOf(one: Shape): string {
  return `${one.pageTypeSlug}${NAMES}${one.slug}`
}

const carriedFiled = heldEach((reading: Reading, pageTypeSlug: string): readonly Carrying[] => {
  const found: Carrying[] = []
  for (const line of reading.lines(fileFor(pageTypeSlug))) {
    const one = carryingIn(line)
    if (one !== null) found.push(one)
  }
  return found
})

export function carriedOf(one: Carrying): Carried {
  return {
    ...one,
    uniquePropertySlug: one.uniquePropertySlug ?? undefined,
    fixed: one.fixed ?? undefined,
  }
}

export function carriedOfType(given: string | Reading, pageTypeSlug: string): readonly Carrying[] {
  return answered(given, "", `what a \`${pageTypeSlug}\` page carries`, (reading) =>
    carriedFiled(reading, pageTypeSlug)
  )
}

export function shapesIn(values: Iterable<Value>): ReadonlyMap<string, Shape> {
  const found = new Map<string, Shape>()
  for (const value of values) {
    const one = shapedIn(value)
    if (one === null || found.has(namedOf(one))) continue
    found.set(namedOf(one), one)
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
