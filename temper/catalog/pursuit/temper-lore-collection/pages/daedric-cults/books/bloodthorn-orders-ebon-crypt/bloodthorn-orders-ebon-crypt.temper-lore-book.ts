import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bloodthornOrdersEbonCrypt = {
  id: "01a0d5f2-253a-7cfc-bf93-8aa990dfa008",
  type: "page-type/temper-lore-book",
  slug: "bloodthorn-orders-ebon-crypt",
  title: "Bloodthorn Orders: Ebon Crypt",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 86,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
