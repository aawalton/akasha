import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const uzdabikhsHelm = {
  id: "01a0d5f6-d68c-7db7-aa99-3c389708a984",
  type: "page-type/temper-lore-book",
  slug: "uzdabikhs-helm",
  title: "Uzdabikh's Helm",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3111,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
