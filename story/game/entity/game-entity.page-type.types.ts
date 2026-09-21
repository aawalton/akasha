import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { AttributeScores } from "akasha/story/game/entity/properties/attribute-scores.record-property.types.ts"
import type { EntityClass } from "akasha/story/game/entity/properties/entity-class.text-property.types.ts"
import type { EntityGame } from "akasha/story/game/entity/properties/entity-game.relation-property.types.ts"
import type { EntityKind } from "akasha/story/game/entity/properties/entity-kind.text-property.types.ts"
import type { EntityLevel } from "akasha/story/game/entity/properties/entity-level.number-property.types.ts"

export type GameEntity = Page & {
  title: Title
  game: EntityGame
  kind: EntityKind
  class?: EntityClass
  level?: EntityLevel
  attributes?: AttributeScores
}
