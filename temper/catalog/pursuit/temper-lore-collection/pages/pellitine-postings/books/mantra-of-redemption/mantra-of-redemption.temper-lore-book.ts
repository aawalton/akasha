import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mantraOfRedemption = {
  id: "01a0d60b-4e02-752d-bfe0-314ed249a0de",
  type: "page-type/temper-lore-book",
  slug: "mantra-of-redemption",
  title: "Mantra of Redemption",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5664,
  bookIndex: 11,
  charted: true,
  quest: 6396,
  positions: "jsonl",
} as const satisfies TemperLoreBook
