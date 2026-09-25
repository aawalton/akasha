import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTurtleAndTheSloth = {
  id: "01a0d60d-ff6a-7502-83e9-884f390df124",
  type: "page-type/temper-lore-book",
  slug: "the-turtle-and-the-sloth",
  title: "The Turtle and the Sloth",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8480,
  bookIndex: 58,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2603, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
