import type { EquipType } from "akasha/temper/catalog/gear/temper-equip-type/properties/equip-type.number-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"

export type TemperEquipType = TemperCatalogThing & {
  equipType: EquipType
}
