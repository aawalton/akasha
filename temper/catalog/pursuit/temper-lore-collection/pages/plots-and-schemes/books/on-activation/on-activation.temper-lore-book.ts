import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onActivation = {
  id: "01a0d5f4-c388-7d8c-84a1-8f4af3b6ebb3",
  type: "page-type/temper-lore-book",
  slug: "on-activation",
  title: "On Activation",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 526,
  bookIndex: 9,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
