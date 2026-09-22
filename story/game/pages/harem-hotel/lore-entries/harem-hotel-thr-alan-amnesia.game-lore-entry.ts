import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelThrAlanAmnesia = {
  id: "01a0c94e-bf81-79b4-af2e-39937c0cd3b4",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-thr-alan-amnesia",
  title: "Alan",
  game: "game/harem-hotel",
  kind: "thread",
  subject: "alan",
  said: "What tore off the front of Alan's life and brought him to the hotel — his amnesia's cause — remains unknown.",
  turn: 2,
  quote: "You woke with the front of your life torn off; I can't tell you what tore it",
  status: "open",
} as const satisfies GameLoreEntry
