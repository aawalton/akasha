import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import { temperLocationType } from "akasha/temper/catalog/world/temper-location-type/temper-location-type.page-type.ts"
import type { TemperLocationType } from "akasha/temper/catalog/world/temper-location-type/temper-location-type.page-type.types.ts"

type LocationRow = Pick<TemperLocationType, "key" | "displayOrder">

function keysInOrder(this: void): readonly string[] {
  const rows: LocationRow[] = []
  for (const one of $pagesOfType<LocationRow>(temperLocationType)) rows.push(one)
  rows.sort((one, two) => one.displayOrder - two.displayOrder)
  return rows.map((one) => one.key)
}

let held: readonly string[] | undefined

export function locationTypeOrder(): readonly string[] {
  if (held === undefined) held = keysInOrder()
  return held
}
