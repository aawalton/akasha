import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { Icon } from "akasha/page/properties/icon.text-property.types.ts"
import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"
import type { ItemLevel } from "akasha/temper/catalog/gear/thing/properties/item-level.text-property.types.ts"
import type { PotionSeconds } from "akasha/temper/catalog/gear/thing/properties/potion-seconds.number-property.types.ts"
import type { ItemId } from "akasha/temper/catalog/thing/properties/item-id.number-property.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"

export type TemperPotionDropped = TemperPotion & {
  description: Description
  displayOrder: DisplayOrder
  icon: Icon
  itemId: ItemId
  level: ItemLevel
  seconds: PotionSeconds
}
