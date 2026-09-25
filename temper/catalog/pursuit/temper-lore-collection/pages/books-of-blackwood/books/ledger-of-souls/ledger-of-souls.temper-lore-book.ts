import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ledgerOfSouls = {
  id: "01a0d60b-fdb0-705d-bd5f-8f87c4ddeef4",
  type: "page-type/temper-lore-book",
  slug: "ledger-of-souls",
  title: "Ledger of Souls",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6595,
  bookIndex: 64,
  charted: true,
  quest: 6661,
  positions: "jsonl",
} as const satisfies TemperLoreBook
