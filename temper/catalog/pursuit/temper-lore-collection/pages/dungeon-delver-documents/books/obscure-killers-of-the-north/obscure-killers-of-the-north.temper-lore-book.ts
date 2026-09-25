import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const obscureKillersOfTheNorth = {
  id: "01a0d60d-708e-73e4-b7bb-0a99c6d21094",
  type: "page-type/temper-lore-book",
  slug: "obscure-killers-of-the-north",
  title: "Obscure Killers of the North",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 7786,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
