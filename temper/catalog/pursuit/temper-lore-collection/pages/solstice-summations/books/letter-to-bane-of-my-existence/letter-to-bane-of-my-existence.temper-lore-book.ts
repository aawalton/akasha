import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToBaneOfMyExistence = {
  id: "01a0d60d-ff6a-7888-a16f-1e4900cf2862",
  type: "page-type/temper-lore-book",
  slug: "letter-to-bane-of-my-existence",
  title: "Letter to Bane of My Existence",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8402,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
