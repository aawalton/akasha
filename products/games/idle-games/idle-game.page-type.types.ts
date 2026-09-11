import type { Collection } from "akasha/alan/collections/collection.page-type.types.ts"
import type { LastViewedAt } from "akasha/alan/track/daily/days/properties/last-viewed-at.instant-property.types.ts"
import type { FavoritedAt } from "akasha/products/games/idle-games/properties/favorited-at.instant-property.types.ts"
import type { GameEngine } from "akasha/story/games/properties/game-engine.text-property.ts"

export type IdleGame = Collection & {
  gameEngine: GameEngine
  favoritedAt?: FavoritedAt
  lastViewedAt?: LastViewedAt
}
