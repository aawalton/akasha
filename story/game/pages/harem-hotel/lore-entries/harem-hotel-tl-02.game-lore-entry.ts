import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelTl02 = {
  id: "01a0c94c-413f-7dca-9508-5e966eac01b6",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-tl-02",
  title: "Aria",
  game: "game/harem-hotel",
  kind: "timeline",
  subject: "aria",
  said: "The wall grows a doorway and a woman (Aria) steps out of it, greeting Alan where he lies.",
  turn: 1,
  quote: "A woman comes out of it.",
  ordinal: 2,
} as const satisfies GameLoreEntry
