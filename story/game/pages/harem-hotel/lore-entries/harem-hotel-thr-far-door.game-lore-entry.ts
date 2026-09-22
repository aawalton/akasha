import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelThrFarDoor = {
  id: "01a0c94c-4103-7d73-a17a-0349fd46a937",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-thr-far-door",
  title: "Harem Hotel",
  game: "game/harem-hotel",
  kind: "thread",
  subject: "harem-hotel",
  said: "The far shut door at the dark end of the hall — the 'adventure' way — looks as if it wants something of Alan before it opens; still unentered.",
  turn: 3,
  quote: "has the look of somewhere that wants something from you before it opens",
  status: "open",
} as const satisfies GameLoreEntry
