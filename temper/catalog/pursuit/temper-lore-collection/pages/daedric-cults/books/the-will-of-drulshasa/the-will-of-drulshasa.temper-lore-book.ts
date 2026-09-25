import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theWillOfDrulshasa = {
  id: "01a0d5f2-253c-7ec4-8649-fe29e87bf64a",
  type: "page-type/temper-lore-book",
  slug: "the-will-of-drulshasa",
  title: "The Will of Drulshasa",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 561,
  bookIndex: 18,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
