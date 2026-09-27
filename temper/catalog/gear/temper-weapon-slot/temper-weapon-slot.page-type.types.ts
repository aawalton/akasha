import type { SlotEquipType } from "akasha/temper/catalog/gear/temper-equip-type/properties/slot-equip-type.relation-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperWeaponSlot = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  slotEquipType: SlotEquipType
}
