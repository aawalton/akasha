import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tomeOfTheAnkaRaGuardians = {
  id: "01a0d5f1-c91b-792a-8c19-7b023da1bff4",
  type: "page-type/temper-lore-book",
  slug: "tome-of-the-anka-ra-guardians",
  title: "Tome of the Anka-Ra Guardians",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2426,
  bookIndex: 5,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
