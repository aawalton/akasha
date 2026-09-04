import type { Answering } from "@akasha/indexes/answering"
import { partedIn } from "@akasha/pages-system/page-file-name"

const SHAPE_TYPE = "01a05da1-60fc-76ca-8503-b43deb6d5f53"

export type Shape = {
  readonly slug: string
  readonly path: string
  readonly definition: string
  readonly allowed: boolean | null
  readonly reason: string | null
  readonly pattern: string | null
  readonly rules: readonly string[]
}

function textIn(held: Record<string, unknown>, key: string): string | null {
  const said = held[key]
  return typeof said === "string" ? said : null
}

function rulesIn(held: Record<string, unknown>): readonly string[] {
  const said = held.rules
  if (!Array.isArray(said)) return []
  return said.filter((one): one is string => typeof one === "string")
}

function shapeIn(index: Answering, pageTypeSlug: string, path: string): Shape {
  const said = partedIn(path)
  if (said === null) {
    throw new Error(`${path} is a sentence shape, and its name says no slug a reader can take`)
  }
  const value = index.pageAt(pageTypeSlug, said.slug)
  if (value === null) {
    throw new Error(`${path} is a sentence shape, and its body declares nothing a reader can take`)
  }
  const allowed = value.allowed
  return {
    slug: said.slug,
    path,
    definition: textIn(value, "definition") ?? "",
    allowed: typeof allowed === "boolean" ? allowed : null,
    reason: textIn(value, "reason"),
    pattern: textIn(value, "pattern"),
    rules: rulesIn(value),
  }
}

export function shapesIn(index: Answering): readonly Shape[] {
  const pageTypeSlug = index.typeSlugOf(SHAPE_TYPE)
  const paths = [...new Set(index.everyOfType(pageTypeSlug).map((one) => one.path))]
  return paths.sort().map((path) => shapeIn(index, pageTypeSlug, path))
}
