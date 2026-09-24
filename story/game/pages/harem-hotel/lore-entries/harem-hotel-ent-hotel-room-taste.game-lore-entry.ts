import type { GameLoreEntry } from "akasha/story/game/game-lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntHotelRoomTaste = {
  id: "01a0c94e-c0a9-7090-9b4d-31bc63300370",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-hotel-room-taste",
  title: "Harem Hotel",
  game: "story-game/harem-hotel",
  kind: "entity",
  subject: "harem-hotel",
  said: "The near room is furnished exactly to Alan's taste — bed, light, and reading-chair placed as if someone had watched him live, though no one has.",
  turn: 5,
  quote:
    "it is furnished like somewhere you already live. The bed is made, and made to your taste.",
  attribute: "room",
} as const satisfies GameLoreEntry
