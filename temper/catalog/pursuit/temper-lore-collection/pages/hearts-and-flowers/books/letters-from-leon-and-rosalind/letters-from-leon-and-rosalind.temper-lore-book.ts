import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lettersFromLeonAndRosalind = {
  id: "01a0d5f2-af70-705d-89da-309637129262",
  type: "page-type/temper-lore-book",
  slug: "letters-from-leon-and-rosalind",
  title: "Letters from Leon and Rosalind",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 1085,
  bookIndex: 32,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
