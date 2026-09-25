import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noticeToAuthorities = {
  id: "01a0d5f2-83a3-7401-8101-72e644d8eec1",
  type: "page-type/temper-lore-book",
  slug: "notice-to-authorities",
  title: "Notice to Authorities",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 1444,
  bookIndex: 59,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
