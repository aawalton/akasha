import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromGad = {
  id: "01a0d60c-baf3-7847-980d-54deb6f307b8",
  type: "page-type/temper-lore-book",
  slug: "letter-from-gad",
  title: "Letter from Gad",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7291,
  bookIndex: 19,
  charted: true,
  quest: 6845,
  positions: "jsonl",
} as const satisfies TemperLoreBook
