import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToWarlordRukar = {
  id: "01a0d60b-8108-7772-82b4-17c05327669a",
  type: "page-type/temper-lore-book",
  slug: "letter-to-warlord-rukar",
  title: "Letter to Warlord Rukar",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5985,
  bookIndex: 17,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
