import type { EquipType } from "akasha/temper/catalog/companion/thing/properties/equip-type.number-property.types.ts"
import type { EquipmentIconName } from "akasha/temper/catalog/companion/thing/properties/equipment-icon-name.text-property.types.ts"
import type { PieceName } from "akasha/temper/catalog/companion/thing/properties/piece-name.text-property.types.ts"
import type { TtcItemId } from "akasha/temper/catalog/companion/thing/properties/ttc-item-id.number-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"

export type TemperCompanionThing = TemperCatalogThing & {
  equipType?: EquipType
  equipmentIconName?: EquipmentIconName
  ttcItemId?: TtcItemId
  pieceName?: PieceName
}
