import type { AttunementCharacter } from "akasha/story/world/mechanics/attunements/properties/attunement-character.relation-property.types.ts"
import type { AttunementCounter } from "akasha/story/world/mechanics/attunements/properties/attunement-counter.number-property.types.ts"
import type { AttunementElement } from "akasha/story/world/mechanics/attunements/properties/attunement-element.relation-property.types.ts"
import type { RankOfAttunement } from "akasha/story/world/mechanics/attunements/properties/rank-of-attunement.relation-property.types.ts"
import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export type WorldAttunement = WorldMechanic & {
  character: AttunementCharacter
  element: AttunementElement
  rank: RankOfAttunement
  counter: AttunementCounter
}
