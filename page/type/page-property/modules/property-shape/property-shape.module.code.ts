import type { Shape } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  slugAt,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const SECTION = "shapes"

const HOLDS = "jsonl"

export function shapesFiledAt(pageTypePath: string): string | null {
  return besideAt(pageTypePath, SECTION, HOLDS)
}

export function shapedIn(value: Value): Shape | null {
  const pageTypeSlug = textAt(value, "type") ?? textAt(value, "pageTypeSlug")
  const slug = textAt(value, "slug")
  const propertySlug = textAt(value, "propertySlug")
  if (pageTypeSlug === null || slug === null || propertySlug === null) return null
  return {
    pageTypeSlug,
    targetPageTypeSlug: slugAt(value, "targetPageType"),
    unique: slugAt(value, "unique"),
    uniquePropertySlug: slugAt(value, "uniqueProperty"),
    slug,
    propertySlug,
    fileName: textAt(value, "fileName"),
    folderName: textAt(value, "folderName"),
    sorted: value["sorted"] === true,
  }
}

export function shapeIn(line: string): Shape | null {
  let said: unknown
  try {
    said = JSON.parse(line)
  } catch {
    return null
  }
  if (said === null || typeof said !== "object" || Array.isArray(said)) return null
  const held = said as Value
  const pageTypeSlug = textAt(held, "pageTypeSlug")
  const slug = textAt(held, "slug")
  const propertySlug = textAt(held, "propertySlug")
  if (pageTypeSlug === null || slug === null || propertySlug === null) return null
  return {
    pageTypeSlug,
    targetPageTypeSlug: textAt(held, "targetPageTypeSlug"),
    unique: textAt(held, "unique"),
    uniquePropertySlug: textAt(held, "uniquePropertySlug"),
    slug,
    propertySlug,
    fileName: textAt(held, "fileName"),
    folderName: textAt(held, "folderName"),
    sorted: held["sorted"] === true,
  }
}

export function shapesIn(body: string): readonly Shape[] {
  const found: Shape[] = []
  for (const line of body.split("\n")) {
    const one = shapeIn(line)
    if (one !== null) found.push(one)
  }
  return found
}

export function bodyOf(every: readonly Shape[]): string {
  const sorted = [...every].sort((one, two) =>
    one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0
  )
  return sorted.map((one) => `${JSON.stringify(one)}\n`).join("")
}
