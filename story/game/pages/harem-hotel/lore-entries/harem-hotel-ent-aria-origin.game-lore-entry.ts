import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntAriaOrigin = {
  id: "01a0c94e-bf6f-7ce9-acf2-afaef13a9301",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-aria-origin",
  title: "Aria",
  game: "game/harem-hotel",
  kind: "entity",
  subject: "aria",
  said: "Arrived in the hotel much as Alan did — elsewhere one moment, here the next, no door behind her; her memory-blank matches his.",
  turn: 2,
  quote:
    "I came into this place much the way you seem to have — elsewhere one moment, here the next, no door behind me I can point to",
  attribute: "origin",
} as const satisfies GameLoreEntry
