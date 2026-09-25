import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fableOfTheDragonAnnotated = {
  id: "01a0d60d-9a63-7454-917f-db86894c6f33",
  type: "page-type/temper-lore-book",
  slug: "fable-of-the-dragon-annotated",
  title: "Fable of the Dragon (Annotated)",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8021,
  charted: true,
  quest: 7203,
  positions: "jsonl",
} as const satisfies TemperLoreBook
