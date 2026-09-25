import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const spiritOfTheVolcano = {
  id: "01a0d60c-baf4-726f-825b-5ff873a52011",
  type: "page-type/temper-lore-book",
  slug: "spirit-of-the-volcano",
  title: "Spirit of the Volcano",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7599,
  bookIndex: 71,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
