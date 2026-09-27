import type { ArmorSlotId as ArmorSlotPageSlug } from "akasha/temper/catalog/gear/equipment/kind/modules/gear-kind-ids/gear-kind-ids.data-table.code.ts"
import {
  gearTableOf,
  heldGearTable,
  inGearOrder,
} from "akasha/temper/catalog/gear/equipment/modules/held-gear-table/held-gear-table.module.code.ts"

export type ArmorSlotId = ArmorSlotPageSlug

interface ArmorSlotTemplate {
  readonly id: ArmorSlotId
  readonly name: string
  readonly icon: string
}

type Row = Readonly<Record<string, unknown>>

const held = heldGearTable<ArmorSlotId, ArmorSlotTemplate>("armor slots")

export const armorSlots = held.table

export function holdArmorSlots(pages: Iterable<Row>): undefined {
  held.hold(
    gearTableOf(
      inGearOrder(pages, "hashPlace").map(
        (row): ArmorSlotTemplate => ({
          id: String(row.slug) as ArmorSlotId,
          name: String(row.title),
          icon: String(row.icon),
        })
      )
    )
  )
}
