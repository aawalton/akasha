import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const writOfValidCredentials = {
  id: "01a0d60a-d5be-7d99-869f-063e1c574b44",
  type: "page-type/temper-lore-book",
  slug: "writ-of-valid-credentials",
  title: "Writ of Valid Credentials",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5065,
  bookIndex: 46,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
