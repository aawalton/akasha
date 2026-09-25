import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theEyeOfBaanDar = {
  id: "01a0d60c-eb9c-7efb-a99e-7e1739cdd943",
  type: "page-type/temper-lore-book",
  slug: "the-eye-of-baan-dar",
  title: "The Eye of Baan Dar",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7515,
  bookIndex: 70,
  charted: true,
  quest: 6998,
  positions: "jsonl",
} as const satisfies TemperLoreBook
