import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { LastViewedAt } from "akasha/alan/track/daily/day/properties/last-viewed-at.instant-property.types.ts"
import type { FavoritedAt } from "akasha/product/games/idle-game/properties/favorited-at.instant-property.types.ts"
import type { GameEngine } from "akasha/story/game/properties/game-engine.text-property.types.ts"

export type IdleGame = Collection & {
  gameEngine: GameEngine
  favoritedAt?: FavoritedAt
  lastViewedAt?: LastViewedAt
}
