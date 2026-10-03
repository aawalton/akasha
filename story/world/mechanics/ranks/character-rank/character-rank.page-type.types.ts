import type { HeldRank } from "akasha/story/world/mechanics/ranks/character-rank/properties/held-rank.relation-property.types.ts"
import type { RankCharacter } from "akasha/story/world/mechanics/ranks/character-rank/properties/rank-character.relation-property.types.ts"
import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"

export type CharacterRank = WorldRank & {
  character: RankCharacter
  rank: HeldRank
}
