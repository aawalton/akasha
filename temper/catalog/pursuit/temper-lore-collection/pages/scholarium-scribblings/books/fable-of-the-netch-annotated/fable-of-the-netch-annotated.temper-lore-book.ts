import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fableOfTheNetchAnnotated = {
  id: "01a0d60d-9a63-763d-81bc-60b2550a13d3",
  type: "page-type/temper-lore-book",
  slug: "fable-of-the-netch-annotated",
  title: "Fable of the Netch (Annotated)",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8072,
  bookIndex: 49,
  charted: true,
  quest: 7204,
  positions: "jsonl",
} as const satisfies TemperLoreBook
