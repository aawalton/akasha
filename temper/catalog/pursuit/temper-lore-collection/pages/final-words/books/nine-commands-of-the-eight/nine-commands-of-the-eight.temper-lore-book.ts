import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nineCommandsOfTheEight = {
  id: "01a0d5f6-45ae-7822-836a-679a6b3150e0",
  type: "page-type/temper-lore-book",
  slug: "nine-commands-of-the-eight",
  title: "Nine Commands of the Eight …",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1334,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
