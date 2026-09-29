import type { WorldLegacy } from "akasha/story/world/mechanics/legacies/world-legacy.page-type.types.ts"
import type { OverwhereILegacyHeldCharacter } from "akasha/story/world/pages/hell-hound-evolution-litrpg/stories/played/overwhere-i/mechanics/legacies/held/properties/overwhere-i-legacy-held-character.relation-property.types.ts"
import type { OverwhereILegacyHeldLegacy } from "akasha/story/world/pages/hell-hound-evolution-litrpg/stories/played/overwhere-i/mechanics/legacies/held/properties/overwhere-i-legacy-held-legacy.relation-property.types.ts"
import type { OverwhereILegacyHeldRank } from "akasha/story/world/pages/hell-hound-evolution-litrpg/stories/played/overwhere-i/mechanics/legacies/held/properties/overwhere-i-legacy-held-rank.number-property.types.ts"
import type { OverwhereILegacyHeldReserve } from "akasha/story/world/pages/hell-hound-evolution-litrpg/stories/played/overwhere-i/mechanics/legacies/held/properties/overwhere-i-legacy-held-reserve.number-property.types.ts"

export type OverwhereILegacyHeld = WorldLegacy & {
  character: OverwhereILegacyHeldCharacter
  legacy: OverwhereILegacyHeldLegacy
  rank: OverwhereILegacyHeldRank
  reserve: OverwhereILegacyHeldReserve
}
