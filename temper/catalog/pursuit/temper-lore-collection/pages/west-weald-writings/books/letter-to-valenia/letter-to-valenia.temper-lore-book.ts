import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToValenia = {
  id: "01a0d60d-4aaf-7c56-8cb7-f7c4853780c8",
  type: "page-type/temper-lore-book",
  slug: "letter-to-valenia",
  title: "Letter to Valenia",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8104,
  bookIndex: 90,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
