import type { GameLoreEntry } from "akasha/story/game/game-lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntAriaFitted = {
  id: "01a0c94e-bbd0-7c7a-a10f-1c39daa46e39",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-aria-fitted",
  title: "Aria",
  game: "story-game/harem-hotel",
  kind: "entity",
  subject: "aria",
  said: "For the Doorward fight the Hotel — which fits a room to its guest — has fitted Aria to Alan's measure: the two of them are now the same size as each other. She carries the change like she has decided not to mind it, and fights at his scale.",
  turn: 13,
  quote: "the Hotel that fits a room to its guest has fitted her to your measure tonight",
  attribute: "combatScaling",
} as const satisfies GameLoreEntry
