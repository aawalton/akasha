import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntAriaAge = {
  id: "01a0c94c-425f-7fd1-9cd6-3712edddb1a7",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-aria-age",
  title: "Aria",
  game: "game/harem-hotel",
  kind: "entity",
  subject: "aria",
  said: "By her own account roughly three thousand years old.",
  turn: 7,
  quote: '"Three thousand years I\'ve decided when the scene gets warm," she says at last, low.',
  attribute: "age",
} as const satisfies GameLoreEntry
