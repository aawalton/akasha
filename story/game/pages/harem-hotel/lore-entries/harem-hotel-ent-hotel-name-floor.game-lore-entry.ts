import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntHotelNameFloor = {
  id: "01a0c94c-4155-7dad-b26b-d4e11aa3952c",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-hotel-name-floor",
  title: "Harem Hotel",
  game: "game/harem-hotel",
  kind: "entity",
  subject: "harem-hotel",
  said: "The place is named the Harem Hotel; Alan wakes on its first floor (the floor is the first).",
  turn: 1,
  quote: "the name of the place — the Harem Hotel — and its floor, and the floor is the first.",
  attribute: "identity",
} as const satisfies GameLoreEntry
