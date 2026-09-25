import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const maerolorsChronicle = {
  id: "01a0d60d-708e-7989-baae-3a3ab2bdeed3",
  type: "page-type/temper-lore-book",
  slug: "maerolors-chronicle",
  title: "Maerolor's Chronicle",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 7813,
  bookIndex: 21,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
