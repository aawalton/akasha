import { createRequire } from "node:module"
import { join } from "node:path"
import { everyOfType, typeSlugOf } from "@akasha/indexes"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { partedIn } from "@akasha/pages-system/page-file-name"

const SHAPE_TYPE = "01a05da1-60fc-76ca-8503-b43deb6d5f53"

const loadFrom = createRequire(import.meta.url)

export type Shape = {
  readonly slug: string
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

function shapeIn(root: string, path: string): Shape {
  const said = partedIn(path)
  if (said === null) {
    throw new Error(`${path} is a sentence shape, and its name says no slug a reader can take`)
  }
  const mod = loadFrom(join(root, path)) as Record<string, unknown>
  const held = mod[exportedAs(said.slug)]
  if (held === null || typeof held !== "object") {
    throw new Error(
      `${path} is a sentence shape, and answers to no \`${exportedAs(said.slug)}\` a reader can take`
    )
  }
  const value = held as Record<string, unknown>
  const allowed = value.allowed
  return {
    slug: said.slug,
    definition: textIn(value, "definition") ?? "",
    allowed: typeof allowed === "boolean" ? allowed : null,
    reason: textIn(value, "reason"),
    pattern: textIn(value, "pattern"),
    rules: rulesIn(value),
  }
}

export function shapesIn(root: string): readonly Shape[] {
  const paths = [...new Set(everyOfType(root, typeSlugOf(root, SHAPE_TYPE)).map((one) => one.path))]
  return paths.sort().map((path) => shapeIn(root, path))
}
