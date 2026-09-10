import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const idleGame = {
  id: "01a0658b-3654-7f0d-80b2-2a2c080f184c",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "idle-game",
  definition: "a game Alan plays where the cards are his personas",
  pluralSlug: "idle-games",
  extends: ["page-type/collection"],
  detailConfig: {
    display: "game",
  },
  parts: ["instant-property/favorited-at"],
  properties: [
    { pageProperty: "text-property/game-engine", required: true, many: false },
    { pageProperty: "instant-property/favorited-at", required: false, many: false },
    {
      pageProperty: "instant-property/last-viewed-at",
      required: false,
      many: false,
      uncommitted: true,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The browser has the whole game.",
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
  types: "ts",
} as const satisfies PageType
