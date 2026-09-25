import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bewareUndercityRuffians = {
  id: "01a0d5f2-83a2-7cbc-845c-e045563015f5",
  type: "page-type/temper-lore-book",
  slug: "beware-undercity-ruffians",
  title: "BEWARE: Undercity Ruffians",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 563,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
