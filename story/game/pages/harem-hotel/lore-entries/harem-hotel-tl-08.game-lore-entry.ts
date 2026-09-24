import type { GameLoreEntry } from "akasha/story/game/game-lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelTl08 = {
  id: "01a0c94e-bf99-7c9b-9ee1-763488f00cbe",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-tl-08",
  title: "The System",
  game: "story-game/harem-hotel",
  kind: "timeline",
  subject: "the-system",
  said: "After the kiss the System delivers a flat, ceremony-less readout of what Alan crossed and what the crossing paid, then goes quiet. (The awarded values render as typed System window-beats, not prose.)",
  turn: 10,
  quote:
    "No ceremony to it — it states what you crossed and what the crossing paid you, the way a ledger states a sum, and goes quiet.",
  ordinal: 8,
} as const satisfies GameLoreEntry
