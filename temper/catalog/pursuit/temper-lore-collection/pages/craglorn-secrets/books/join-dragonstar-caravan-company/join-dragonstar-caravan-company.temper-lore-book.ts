import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const joinDragonstarCaravanCompany = {
  id: "01a0d5f1-c91a-7c13-bf78-323268edf205",
  type: "page-type/temper-lore-book",
  slug: "join-dragonstar-caravan-company",
  title: "Join Dragonstar Caravan Company!",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2674,
  bookIndex: 62,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
