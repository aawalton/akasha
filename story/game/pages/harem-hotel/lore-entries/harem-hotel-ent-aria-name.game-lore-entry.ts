import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntAriaName = {
  id: "01a0c94c-4069-78db-a3ff-fd04c1185537",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-aria-name",
  title: "Aria",
  game: "game/harem-hotel",
  kind: "entity",
  subject: "aria",
  said: "The companion's name is Aria (first spoken in the narration at turn-10).",
  turn: 10,
  quote: "you feel Aria go rigid against your chest",
  attribute: "name",
} as const satisfies GameLoreEntry
