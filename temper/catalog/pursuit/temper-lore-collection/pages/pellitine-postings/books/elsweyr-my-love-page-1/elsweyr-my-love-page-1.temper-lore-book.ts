import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const elsweyrMyLovePage1 = {
  id: "01a0d60b-4e02-7ef6-bccb-a1597708f69a",
  type: "page-type/temper-lore-book",
  slug: "elsweyr-my-love-page-1",
  title: "Elsweyr My Love, Page 1",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5751,
  bookIndex: 50,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
