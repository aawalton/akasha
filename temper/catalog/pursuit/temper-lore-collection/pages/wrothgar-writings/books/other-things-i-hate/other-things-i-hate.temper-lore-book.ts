import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const otherThingsIHate = {
  id: "01a0d5f6-d68b-71a1-9407-69b9ff32d3e1",
  type: "page-type/temper-lore-book",
  slug: "other-things-i-hate",
  title: "Other Things I Hate",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3243,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
