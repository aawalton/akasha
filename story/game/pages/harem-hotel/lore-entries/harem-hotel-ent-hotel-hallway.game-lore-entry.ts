import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntHotelHallway = {
  id: "01a0c94c-4287-7a86-a9c8-bfbebd48b299",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-hotel-hallway",
  title: "Harem Hotel",
  game: "game/harem-hotel",
  kind: "entity",
  subject: "harem-hotel",
  said: "The first-floor hallway runs two ways from where Alan wakes: a near end with a wide open warm door onto a room made for him, and a far end that narrows and darkens toward a single shut door at the very end.",
  turn: 1,
  quote:
    "The other way the hall runs on, and narrows, and darkens toward a single shut door at the very end",
  attribute: "layout",
} as const satisfies GameLoreEntry
