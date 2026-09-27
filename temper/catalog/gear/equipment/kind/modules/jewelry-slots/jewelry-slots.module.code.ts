import type { JewelrySlotId as JewelrySlotPageSlug } from "akasha/temper/catalog/gear/equipment/kind/modules/gear-kind-ids/gear-kind-ids.data-table.code.ts"
import type { JewelryTypeId } from "akasha/temper/catalog/gear/equipment/kind/modules/jewelry-types/jewelry-types.module.code.ts"
import {
  gearTableOf,
  heldGearTable,
  inGearOrder,
  slugOf,
} from "akasha/temper/catalog/gear/equipment/modules/held-gear-table/held-gear-table.module.code.ts"

export type JewelrySlotId = JewelrySlotPageSlug

interface JewelrySlotTemplate {
  readonly id: JewelrySlotId
  readonly name: string
  readonly typeId: JewelryTypeId
  readonly icon: string
  readonly equipType: number | undefined
}

type Row = Readonly<Record<string, unknown>>

const held = heldGearTable<JewelrySlotId, JewelrySlotTemplate>("jewelry slots")

export const jewelrySlots = held.table

export function holdJewelrySlots(
  pages: Iterable<Row>,
  equipTypeOfJewelryType: ReadonlyMap<string, number>
): undefined {
  held.hold(
    gearTableOf(
      inGearOrder(pages, "hashPlace").map((row): JewelrySlotTemplate => {
        const typeId = slugOf(row.jewelryType) as JewelryTypeId
        return {
          id: String(row.slug) as JewelrySlotId,
          name: String(row.title),
          typeId,
          icon: String(row.icon),
          equipType: equipTypeOfJewelryType.get(typeId),
        }
      })
    )
  )
}
