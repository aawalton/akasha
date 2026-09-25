import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const spectralAssassins = {
  id: "01a0d5f4-07b9-71da-a92a-82634417b89a",
  type: "page-type/temper-lore-book",
  slug: "spectral-assassins",
  title: "Spectral Assassins",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 6259,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
