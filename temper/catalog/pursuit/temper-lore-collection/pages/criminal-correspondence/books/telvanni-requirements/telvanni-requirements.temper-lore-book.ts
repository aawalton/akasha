import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const telvanniRequirements = {
  id: "01a0d5f1-f452-7c3c-a93d-bd1d11c43384",
  type: "page-type/temper-lore-book",
  slug: "telvanni-requirements",
  title: "Telvanni Requirements",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1247,
  bookIndex: 44,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
