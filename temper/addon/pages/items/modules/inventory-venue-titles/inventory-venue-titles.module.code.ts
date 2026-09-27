import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import { temperVenue } from "akasha/temper/items/rules/routing/core/temper-venue/temper-venue.page-type.ts"
import type { TemperVenue } from "akasha/temper/items/rules/routing/core/temper-venue/temper-venue.page-type.types.ts"

type VenueRow = Pick<TemperVenue, "key" | "title">

function titlesByKey(this: void): { [key: string]: string | undefined } {
  const found: { [key: string]: string | undefined } = {}
  for (const one of $pagesOfType<VenueRow>(temperVenue)) found[one.key] = one.title
  return found
}

let held: { [key: string]: string | undefined } | undefined

export function venueTitleOf(key: string): string {
  if (held === undefined) held = titlesByKey()
  return held[key] ?? key
}
