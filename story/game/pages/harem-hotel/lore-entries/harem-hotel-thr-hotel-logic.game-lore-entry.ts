import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelThrHotelLogic = {
  id: "01a0c94c-41f0-7e8b-9478-820c2ec7dad9",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-thr-hotel-logic",
  title: "Harem Hotel",
  game: "game/harem-hotel",
  kind: "thread",
  subject: "harem-hotel",
  said: "The nature and logic of the Harem Hotel — why it exists, what it wants — is unknown to both Alan and Aria; it has not explained itself.",
  turn: 2,
  quote: "Two people at the bottom of a thing neither can name past its name.",
  status: "open",
} as const satisfies GameLoreEntry
