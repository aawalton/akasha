import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lostCat = {
  id: "01a0d60b-4e02-726f-a4ec-9efbd49c30be",
  type: "page-type/temper-lore-book",
  slug: "lost-cat",
  title: "Lost Cat",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5707,
  bookIndex: 4,
  charted: true,
  quest: 6442,
  positions: "jsonl",
} as const satisfies TemperLoreBook
