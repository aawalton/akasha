import type { AttunementCharacter } from "akasha/story/mechanic/attunement/properties/attunement-character.relation-property.types.ts"
import type { AttunementCounter } from "akasha/story/mechanic/attunement/properties/attunement-counter.number-property.types.ts"
import type { AttunementElement } from "akasha/story/mechanic/attunement/properties/attunement-element.relation-property.types.ts"
import type { RankOfAttunement } from "akasha/story/mechanic/attunement/properties/rank-of-attunement.relation-property.types.ts"
import type { Mechanic } from "akasha/story/mechanic/mechanic.page-type.types.ts"

export type Attunement = Mechanic & {
  character: AttunementCharacter
  element: AttunementElement
  rank: RankOfAttunement
  counter: AttunementCounter
}
