import type { GameLoreEntry } from "akasha/story/game/game-lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntHotelNameFloor = {
  id: "01a0c94e-bf43-7e03-b817-06fe1bc36475",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-hotel-name-floor",
  title: "Harem Hotel",
  game: "story-game/harem-hotel",
  kind: "entity",
  subject: "harem-hotel",
  said: "The place is named the Harem Hotel; Alan wakes on its first floor (the floor is the first).",
  turn: 1,
  quote: "the name of the place — the Harem Hotel — and its floor, and the floor is the first.",
  attribute: "identity",
} as const satisfies GameLoreEntry
