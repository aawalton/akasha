import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theGrandeyaIsInCustody = {
  id: "01a0d5f4-3c13-7545-be40-b398b0097ab4",
  type: "page-type/temper-lore-book",
  slug: "the-grandeya-is-in-custody",
  title: "The Grandeya is in Custody",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2034,
  bookIndex: 80,
  charted: true,
  quest: 2070,
  positions: "jsonl",
} as const satisfies TemperLoreBook
