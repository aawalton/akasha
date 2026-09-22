import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelThrSystemOnlyAlan = {
  id: "01a0c94c-429f-7585-8f28-4c9d763333fd",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-thr-system-only-alan",
  title: "The System",
  game: "game/harem-hotel",
  kind: "thread",
  subject: "the-system",
  said: "Why the System pane is visible and speaks only to Alan, never to Aria, is an open mystery.",
  turn: 6,
  quote: '"I got no message."',
  status: "open",
} as const satisfies GameLoreEntry
