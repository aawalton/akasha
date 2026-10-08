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
  createdAt: "2026-09-25T00:23:31.387Z",
  updatedAt: "2026-09-25T00:23:33.000Z",
} as const satisfies TemperLoreBook
