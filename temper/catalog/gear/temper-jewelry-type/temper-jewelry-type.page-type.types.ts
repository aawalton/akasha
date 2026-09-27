import type { EquipType } from "akasha/temper/catalog/companion/thing/properties/equip-type.number-property.types.ts"
import type { SlotEquipType } from "akasha/temper/catalog/gear/temper-equip-type/properties/slot-equip-type.relation-property.types.ts"
import type { ValidSlots } from "akasha/temper/catalog/gear/thing/properties/valid-slots.one-of-property.types.ts"
import type { TemperGearThing } from "akasha/temper/catalog/gear/thing/temper-gear-thing.page-type.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperJewelryType = TemperGearThing & {
  key: Key
  validSlots: ValidSlots
  equipType: EquipType
  slotEquipType?: SlotEquipType
}
