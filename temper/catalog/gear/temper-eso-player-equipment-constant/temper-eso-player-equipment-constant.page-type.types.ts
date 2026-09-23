import type { ConstantFamily } from "akasha/temper/catalog/gear/temper-eso-player-equipment-constant/properties/constant-family.select-property.types.ts"
import type { ConstantId } from "akasha/temper/catalog/gear/temper-eso-player-equipment-constant/properties/constant-id.text-property.types.ts"
import type { EsoNum } from "akasha/temper/catalog/gear/temper-eso-player-equipment-constant/properties/eso-num.number-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperEsoPlayerEquipmentConstant = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  constantFamily: ConstantFamily
  constantId: ConstantId
  esoNum: EsoNum
}
