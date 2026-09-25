import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aChangeInTheChimer = {
  id: "01a0d60d-9a62-7a4f-aa5e-7fc4bc7d39e1",
  type: "page-type/temper-lore-book",
  slug: "a-change-in-the-chimer",
  title: "A Change in the Chimer",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8153,
  bookIndex: 7,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
} as const satisfies TemperLoreBook
