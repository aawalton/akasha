import type { JewelryTypeId } from "akasha/temper/catalog/gear/temper-jewelry-slot/properties/jewelry-type-id.text-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Icon } from "akasha/temper/thing/properties/icon.text-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperJewelrySlot = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  icon: Icon
  jewelryType: JewelryTypeId
}
