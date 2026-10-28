import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { PluralTitle } from "akasha/story/world/mechanics/ability-kinds/properties/plural-title.text-property.types.ts"
import type { StatSlots } from "akasha/story/world/mechanics/stat-groups/properties/stat-slots.number-property.types.ts"
import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"

export type WorldStatGroup = WorldMechanic & {
  title: Title
  pluralTitle: PluralTitle
  statSlots?: StatSlots
  displayOrder?: DisplayOrder
}
