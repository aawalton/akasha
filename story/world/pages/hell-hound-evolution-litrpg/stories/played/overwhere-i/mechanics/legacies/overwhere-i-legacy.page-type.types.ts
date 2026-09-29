import type { WorldLegacy } from "akasha/story/world/mechanics/legacies/world-legacy.page-type.types.ts"
import type { OverwhereILegacyElementCost } from "akasha/story/world/pages/hell-hound-evolution-litrpg/stories/played/overwhere-i/mechanics/legacies/properties/overwhere-i-legacy-element-cost.number-property.types.ts"
import type { OverwhereILegacyRanks } from "akasha/story/world/pages/hell-hound-evolution-litrpg/stories/played/overwhere-i/mechanics/legacies/properties/overwhere-i-legacy-ranks.text-property.types.ts"
import type { OverwhereILegacyRefillMinutes } from "akasha/story/world/pages/hell-hound-evolution-litrpg/stories/played/overwhere-i/mechanics/legacies/properties/overwhere-i-legacy-refill-minutes.number-property.types.ts"

export type OverwhereILegacy = WorldLegacy & {
  ranks: OverwhereILegacyRanks
  refillMinutes?: OverwhereILegacyRefillMinutes
  elementCost?: OverwhereILegacyElementCost
}
