import type { PageType } from "@akasha/pages-system/page-type"
import type { LastViewedAt } from "../../alan/tracking/daily/wake-days/properties/last-viewed-at.instant-property.ts"
import type { Collection } from "../../collection-system/collections/collection.page-type.ts"
import type { GameEngine } from "../../story/games/properties/game-engine.text-property.ts"
import type { FavoritedAt } from "./properties/favorited-at.instant-property.ts"

export type IdleGame = Collection & {
  gameEngine: GameEngine
  favoritedAt?: FavoritedAt
  lastViewedAt?: LastViewedAt
}

export const idleGame = {
  id: "01a0658b-3654-7f0d-80b2-2a2c080f184c",
  pageTypeSlug: "page-type",
  slug: "idle-game",
  definition: "a game Alan plays where the cards are his personas",
  pluralSlug: "idle-games",
  extendsSlug: ["page-type/collection"],
  detailConfig: {
    display: "game",
  },
  partSlugs: ["instant-property/favorited-at"],
  properties: [
    { pagePropertySlug: "game-engine", required: true, many: false },
    { pagePropertySlug: "favorited-at", required: false, many: false },
    { pagePropertySlug: "last-viewed-at", required: false, many: false, uncommitted: true },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The browser holds the whole game.",
    },
    {
      invariantKind: "departure",
      statement: "The server keeps a saved copy of the game and nothing more.",
    },
    {
      invariantKind: "departure",
      statement: "The save is read once as the game opens and never read again.",
    },
    {
      invariantKind: "departure",
      statement: "An idle game's roster is drawn from the personas.",
    },
  ],
} as const satisfies PageType
