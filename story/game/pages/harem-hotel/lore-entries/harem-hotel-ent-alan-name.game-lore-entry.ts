import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntAlanName = {
  id: "01a0c94e-c004-7f15-8945-40c901479bc5",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-alan-name",
  title: "Alan",
  game: "game/harem-hotel",
  kind: "entity",
  subject: "alan",
  said: "The protagonist's name is Alan — it arrives on waking, fastened to nothing else.",
  turn: 1,
  quote:
    "For one blank second you don't have your own name, and then you do — *Alan* — and it arrives clean and sure and fastened to absolutely nothing else.",
  attribute: "name",
} as const satisfies GameLoreEntry
