import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const clanOfTheWhiteBear = {
  id: "01a0d5f3-3fda-7719-8a9a-423e2bd76c1b",
  type: "page-type/temper-lore-book",
  slug: "clan-of-the-white-bear",
  title: "Clan of the White Bear",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1117,
  bookIndex: 38,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
