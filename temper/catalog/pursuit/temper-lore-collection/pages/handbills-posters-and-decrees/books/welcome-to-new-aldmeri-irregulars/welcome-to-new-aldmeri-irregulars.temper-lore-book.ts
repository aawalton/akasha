import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const welcomeToNewAldmeriIrregulars = {
  id: "01a0d5f2-83a4-73cb-917d-5a7488ef35e3",
  type: "page-type/temper-lore-book",
  slug: "welcome-to-new-aldmeri-irregulars",
  title: "Welcome to New Aldmeri Irregulars",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 816,
  bookIndex: 27,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
