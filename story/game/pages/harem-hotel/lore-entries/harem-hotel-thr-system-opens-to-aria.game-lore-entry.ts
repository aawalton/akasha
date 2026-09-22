import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelThrSystemOpensToAria = {
  id: "01a0c94c-4093-7690-9f28-045813bdc256",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-thr-system-opens-to-aria",
  title: "The System",
  game: "game/harem-hotel",
  kind: "thread",
  subject: "the-system",
  said: "The System, which had only ever addressed Alan, speaks to Aria for the first time in all her years at THE LINK's first activation. Why it opened to her now — and precisely what THE LINK is — is the new open question.",
  turn: 10,
  quote: "It is talking to her now.",
  status: "open",
  supersedes: "game-lore-entry/harem-hotel-thr-system-only-alan",
} as const satisfies GameLoreEntry
