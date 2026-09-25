import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const defiantGraffiti = {
  id: "01a0d5f8-02f8-79b8-89ce-870df7f8df27",
  type: "page-type/temper-lore-book",
  slug: "defiant-graffiti",
  title: "Defiant Graffiti",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 4623,
  bookIndex: 15,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
