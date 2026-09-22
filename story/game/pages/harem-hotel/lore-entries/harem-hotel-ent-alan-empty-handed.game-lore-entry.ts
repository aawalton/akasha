import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntAlanEmptyHanded = {
  id: "01a0c94c-3dc5-754c-9f4e-05e9a7653d21",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-alan-empty-handed",
  title: "Alan",
  game: "game/harem-hotel",
  kind: "entity",
  subject: "alan",
  said: "Alan meets the Doorward as he is — one man, empty-handed, with nothing on him but the clothes he woke in. He carries no weapon and no object into the fight.",
  turn: 13,
  quote: "one man, empty-handed, nothing on you but the clothes you woke in.",
  attribute: "inventory",
} as const satisfies GameLoreEntry
