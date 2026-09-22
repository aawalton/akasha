import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntAriaNeverBefore = {
  id: "01a0c94e-be83-743a-a93a-6a39f2acf386",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-aria-never-before",
  title: "Aria",
  game: "game/harem-hotel",
  kind: "entity",
  subject: "aria",
  said: "Despite three thousand years, Aria says she has never done 'this' before — never before wanted someone she wished to slow down for, nor anything she did not want to be finished with.",
  turn: 10,
  quote: 'As if I hadn\'t done this before." Her eyes come up. "I hadn\'t. Not once. Not this."',
  attribute: "history",
} as const satisfies GameLoreEntry
