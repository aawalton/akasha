import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { EntityGame } from "akasha/story/game/entity/properties/entity-game.relation-property.types.ts"

export type GameEntity = Page & {
  title: Title
  game: EntityGame
}
