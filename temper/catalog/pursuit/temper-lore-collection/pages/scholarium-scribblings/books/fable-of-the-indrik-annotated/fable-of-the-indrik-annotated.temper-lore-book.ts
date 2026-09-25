import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fableOfTheIndrikAnnotated = {
  id: "01a0d60d-9a63-70dd-be8c-3e77ba91fe5b",
  type: "page-type/temper-lore-book",
  slug: "fable-of-the-indrik-annotated",
  title: "Fable of the Indrik (Annotated)",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 7870,
  bookIndex: 42,
  charted: true,
  quest: 7197,
  positions: "jsonl",
} as const satisfies TemperLoreBook
