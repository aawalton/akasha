import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const cubTales = {
  id: "01a0d5f5-7766-729f-a97a-4d1990c5e5a5",
  type: "page-type/temper-lore-book",
  slug: "cub-tales",
  title: "Cub Tales",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1457,
  bookIndex: 69,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
