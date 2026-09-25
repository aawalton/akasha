import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theCallBeyond = {
  id: "01a0d5f6-a29a-7548-9e96-09584c14ccce",
  type: "page-type/temper-lore-book",
  slug: "the-call-beyond",
  title: "The Call Beyond",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5374,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
