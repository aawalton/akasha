import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const whereAreThePeople = {
  id: "01a0d5f5-abbb-70e5-849e-d6338eb5edcb",
  type: "page-type/temper-lore-book",
  slug: "where-are-the-people",
  title: "WHERE ARE THE PEOPLE",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 1041,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
