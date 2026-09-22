import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntAlanAmnesia = {
  id: "01a0c94c-4205-7619-b872-8bca96d46204",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-alan-amnesia",
  title: "Alan",
  game: "game/harem-hotel",
  kind: "entity",
  subject: "alan",
  said: "Alan woke at the bottom of the hotel with no memory of arriving — no door he came through, no before.",
  turn: 1,
  quote: "No door you came through. No before.",
  attribute: "memory",
} as const satisfies GameLoreEntry
