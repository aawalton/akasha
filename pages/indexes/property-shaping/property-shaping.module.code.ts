import { DECLARING_AT } from "akasha/pages/indexes/declaring/index-declaring.index.code.ts"
import { heldOnce } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading, Schema } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import { textAt, type Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

function shapesIn(reading: Reading): ReadonlyMap<string, Schema> {
  const found = new Map<string, Schema>()
  for (const line of reading.lines(DECLARING_AT)) {
    const said: unknown = JSON.parse(line)
    if (said === null || typeof said !== "object" || Array.isArray(said)) continue
    const held = said as Value
    const pageTypeSlug = textAt(held, "pageTypeSlug") ?? ""
    const slug = textAt(held, "slug") ?? ""
    const named = `${pageTypeSlug}/${slug}`
    if (found.has(named)) continue
    found.set(named, {
      pageTypeSlug,
      targetPageTypeSlug: textAt(held, "targetPageTypeSlug"),
      unique: textAt(held, "unique"),
      uniquePropertySlug: textAt(held, "uniquePropertySlug"),
      slug,
      propertySlug: textAt(held, "propertySlug") ?? "",
      fileName: textAt(held, "fileName"),
      folderName: textAt(held, "folderName"),
    })
  }
  return found
}

const shaped = heldOnce(shapesIn)

export function shapesAt(given: string | Reading): ReadonlyMap<string, Schema> {
  return shaped(given)
}
