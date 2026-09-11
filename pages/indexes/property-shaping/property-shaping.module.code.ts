import { addressedIn, addressIn } from "akasha/pages/address/page-address.module.code.ts"
import { DECLARING_AT } from "akasha/pages/indexes/declaring/index-declaring.index.code.ts"
import { answered, heldOnce } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading, Shape } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import { textAt, type Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

function shapesIn(reading: Reading): ReadonlyMap<string, Shape> {
  const found = new Map<string, Shape>()
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

export function shapesAt(given: string | Reading): ReadonlyMap<string, Shape> {
  return shaped(given)
}

export type Shaping = { readonly shape: Shape } | { readonly refused: string }

function carriesNo(slug: string): string {
  return `no page property carries the slug \`${slug}\``
}

function among(slug: string, named: readonly string[]): string {
  return (
    `\`${slug}\` narrows to ${named.length} page properties and must name its page type — ` +
    [...named].sort().join(", ")
  )
}

function searchedIn(reading: Reading, slug: string): Shaping {
  const found: Shape[] = []
  const qualified: string[] = []
  for (const held of shapesAt(reading).values()) {
    if (held.slug !== slug) continue
    found.push(held)
    qualified.push(`${held.pageTypeSlug}/${slug}`)
  }
  const one = found[0]
  if (found.length === 1 && one !== undefined) return { shape: one }
  return { refused: found.length === 0 ? carriesNo(slug) : among(slug, qualified) }
}

function namedIn(reading: Reading, named: string): Shaping {
  const bare = addressIn(named)
  if (bare.kind === "bare") return searchedIn(reading, bare.slug)
  const address = addressedIn(named)
  if ("refused" in address) return { refused: address.refused }
  if ("id" in address) {
    return { refused: `\`${named}\` names a page by id, and a page property is named by its slug` }
  }
  const one = shapesAt(reading).get(`${address.pageTypeSlug}/${address.value}`)
  return one === undefined ? { refused: carriesNo(address.value) } : { shape: one }
}

export function shapeOf(given: string | Reading, named: string): Shaping {
  return answered(given, "", `what shape \`${named}\` has`, (reading) => namedIn(reading, named))
}
