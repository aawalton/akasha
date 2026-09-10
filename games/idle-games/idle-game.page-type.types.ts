import type { LastViewedAt } from "../../alan/track/daily/days/properties/last-viewed-at.instant-property.ts"
import type { Collection } from "../../collections/collection.page-type.ts"
import type { GameEngine } from "../../story/games/properties/game-engine.text-property.ts"
import type { FavoritedAt } from "./properties/favorited-at.instant-property.ts"

export type IdleGame = Collection & {
  gameEngine: GameEngine
  favoritedAt?: FavoritedAt
  lastViewedAt?: LastViewedAt
}
