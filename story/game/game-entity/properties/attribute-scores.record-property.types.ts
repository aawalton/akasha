import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { AttributeScore } from "akasha/story/game/game-entity/properties/attribute-score.number-property.types.ts"
import type { ScoredAttribute } from "akasha/story/game/game-entity/properties/scored-attribute.relation-property.types.ts"

export type AttributeScores = List<{
  attribute: ScoredAttribute
  score: AttributeScore
}>
