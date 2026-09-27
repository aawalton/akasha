import type { AllowsLegendary } from "akasha/temper/catalog/companion/jewelry-slot/properties/allows-legendary.boolean-property.types.ts"
import type { SlotCategory } from "akasha/temper/catalog/companion/jewelry-slot/properties/slot-category.text-property.types.ts"
import type { EquipType } from "akasha/temper/catalog/companion/thing/properties/equip-type.number-property.types.ts"
import type { TemperCompanionThing } from "akasha/temper/catalog/companion/thing/temper-companion-thing.page-type.types.ts"
import type { SlotEquipType } from "akasha/temper/catalog/gear/temper-equip-type/properties/slot-equip-type.relation-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperCompanionJewelrySlot = TemperCompanionThing & {
  key: Key
  equipType: EquipType
  slotEquipType?: SlotEquipType
  slotCategory: SlotCategory
  allowsLegendary?: AllowsLegendary
}
