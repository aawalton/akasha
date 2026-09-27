import type { WeaponSlotId } from "akasha/temper/catalog/gear/equipment/kind/modules/gear-kind-ids/gear-kind-ids.data-table.code.ts"
import {
  gearTableOf,
  heldGearTable,
  inGearOrder,
} from "akasha/temper/catalog/gear/equipment/modules/held-gear-table/held-gear-table.module.code.ts"

export type WeaponSlot = WeaponSlotId

interface WeaponSlotTemplate {
  readonly id: WeaponSlot
  readonly name: string
  readonly icon?: string
}

type Row = Readonly<Record<string, unknown>>

const held = heldGearTable<WeaponSlot, WeaponSlotTemplate>("weapon slots")

export const weaponSlots = held.table

export function holdWeaponSlots(pages: Iterable<Row>): undefined {
  held.hold(
    gearTableOf(
      inGearOrder(pages, "displayOrder").map(
        (row): WeaponSlotTemplate => ({
          id: String(row.slug) as WeaponSlot,
          name: String(row.title),
          ...(typeof row.icon === "string" ? { icon: row.icon } : {}),
        })
      )
    )
  )
}
