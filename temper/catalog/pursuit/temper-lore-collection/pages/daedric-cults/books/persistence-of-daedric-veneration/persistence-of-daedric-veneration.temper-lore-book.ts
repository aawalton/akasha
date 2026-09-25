import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const persistenceOfDaedricVeneration = {
  id: "01a0d5f2-253b-7431-9e5e-7f447ce29a4f",
  type: "page-type/temper-lore-book",
  slug: "persistence-of-daedric-veneration",
  title: "Persistence of Daedric Veneration",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 876,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
