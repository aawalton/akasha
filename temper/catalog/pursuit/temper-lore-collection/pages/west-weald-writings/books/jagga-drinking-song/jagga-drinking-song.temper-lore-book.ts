import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const jaggaDrinkingSong = {
  id: "01a0d60d-4aaf-7e1e-b8b0-b1b91ede9111",
  type: "page-type/temper-lore-book",
  slug: "jagga-drinking-song",
  title: "Jagga Drinking Song",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7827,
  bookIndex: 31,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
} as const satisfies TemperLoreBook
