import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kikosRiddles = {
  id: "01a0d60c-baf3-7a6e-9a7d-51f7e22b1b93",
  type: "page-type/temper-lore-book",
  slug: "kikos-riddles",
  title: "Kiko's Riddles",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7308,
  bookIndex: 20,
  charted: true,
  quest: 6860,
  positions: "jsonl",
} as const satisfies TemperLoreBook
