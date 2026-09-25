import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theMoonsRhyme = {
  id: "01a0d5f6-d68c-75ea-b433-2155947558d2",
  type: "page-type/temper-lore-book",
  slug: "the-moons-rhyme",
  title: "The Moons Rhyme",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3042,
  bookIndex: 35,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
