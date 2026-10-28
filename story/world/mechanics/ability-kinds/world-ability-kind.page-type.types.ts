import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { ActiveSlots } from "akasha/story/world/mechanics/ability-kinds/properties/active-slots.number-property.types.ts"
import type { PluralTitle } from "akasha/story/world/mechanics/ability-kinds/properties/plural-title.text-property.types.ts"
import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export type WorldAbilityKind = WorldMechanic & {
  title: Title
  pluralTitle: PluralTitle
  activeSlots?: ActiveSlots
}
