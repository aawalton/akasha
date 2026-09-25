import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const spottedACave = {
  id: "01a0d5f2-509f-7064-ab6d-f6f4391435aa",
  type: "page-type/temper-lore-book",
  slug: "spotted-a-cave",
  title: "Spotted a Cave",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1754,
  bookIndex: 48,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
