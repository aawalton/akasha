import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scribesOfMephala = {
  id: "01a0d5f8-02f9-739f-859c-b5506dc5465d",
  type: "page-type/temper-lore-book",
  slug: "scribes-of-mephala",
  title: "Scribes of Mephala",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 7478,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
