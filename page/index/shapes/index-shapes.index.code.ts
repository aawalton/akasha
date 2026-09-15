import { join } from "node:path"
import type { Entry } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { indexShapes } from "akasha/page/index/shapes/index-shapes.index.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { shapedIn } from "akasha/page/type/page-property/modules/property-shape/property-shape.module.code.ts"

const SHAPES = indexShapes.name

const PAGE_PROPERTY = "page-property"

const ENDING = ".jsonl"

export function shapeFileFor(pageTypeSlug: string): string {
  return join(SHAPES, PAGE_PROPERTY, `${pageTypeSlug}${ENDING}`)
}

export function shapeFiled(value: Value): readonly Entry[] {
  const one = shapedIn(value)
  if (one === null) return []
  return [{ at: shapeFileFor(one.pageTypeSlug), line: JSON.stringify(one) }]
}
