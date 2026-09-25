import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const callisosLodestone = {
  id: "01a0d60b-8107-7380-9b6f-59ef96fec7b1",
  type: "page-type/temper-lore-book",
  slug: "callisos-lodestone",
  title: "Callisos' Lodestone",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6105,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
