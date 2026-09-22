import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelTl01 = {
  id: "01a0c94c-4127-7003-9f26-0bb242794439",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-tl-01",
  title: "Alan",
  game: "game/harem-hotel",
  kind: "timeline",
  subject: "alan",
  said: "Alan comes into being at the bottom of the Harem Hotel with no memory of arriving; the System pane measures his soul and goes still.",
  turn: 1,
  quote:
    "One moment there is no you at all. Then there is: flat on your back on a floor that is cool and close-carpeted",
  ordinal: 1,
} as const satisfies GameLoreEntry
