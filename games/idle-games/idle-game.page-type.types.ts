import type { Collection } from "../../alan/collections/collection.page-type.types.ts"
import type { LastViewedAt } from "../../alan/track/daily/days/properties/last-viewed-at.instant-property.types.ts"
import type { GameEngine } from "../../story/games/properties/game-engine.text-property.ts"
import type { FavoritedAt } from "./properties/favorited-at.instant-property.types.ts"

export type IdleGame = Collection & {
  gameEngine: GameEngine
  favoritedAt?: FavoritedAt
  lastViewedAt?: LastViewedAt
}
