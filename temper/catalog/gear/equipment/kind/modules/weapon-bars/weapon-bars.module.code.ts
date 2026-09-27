import type { WeaponBarId } from "akasha/temper/catalog/gear/equipment/kind/modules/gear-kind-ids/gear-kind-ids.data-table.code.ts"
import {
  gearTableOf,
  heldGearTable,
  inGearOrder,
} from "akasha/temper/catalog/gear/equipment/modules/held-gear-table/held-gear-table.module.code.ts"

export type WeaponBar = WeaponBarId

interface WeaponBarTemplate {
  readonly id: WeaponBar
  readonly name: string
}

const held = heldGearTable<WeaponBar, WeaponBarTemplate>("weapon bars")

export const weaponBars = held.table

export function holdWeaponBarPages(pages: Iterable<Readonly<Record<string, unknown>>>): undefined {
  held.hold(
    gearTableOf(
      inGearOrder(pages, "displayOrder").map(
        (row): WeaponBarTemplate => ({ id: String(row.slug) as WeaponBar, name: String(row.title) })
      )
    )
  )
  return undefined
}
