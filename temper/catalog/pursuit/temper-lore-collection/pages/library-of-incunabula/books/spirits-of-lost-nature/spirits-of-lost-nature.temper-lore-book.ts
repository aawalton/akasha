import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const spiritsOfLostNature = {
  id: "01a0d5f8-02f9-739e-a6be-6cc3e65def3e",
  type: "page-type/temper-lore-book",
  slug: "spirits-of-lost-nature",
  title: "Spirits of Lost Nature",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 7185,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
