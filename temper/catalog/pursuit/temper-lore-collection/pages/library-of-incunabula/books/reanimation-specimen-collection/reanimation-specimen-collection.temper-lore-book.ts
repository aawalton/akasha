import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const reanimationSpecimenCollection = {
  id: "01a0d5f8-02f9-71c7-817e-ba62fac590ff",
  type: "page-type/temper-lore-book",
  slug: "reanimation-specimen-collection",
  title: "Reanimation Specimen Collection",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 4916,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
