import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const druidFablesSystresBeavers = {
  id: "01a0d60c-baf3-752a-8092-bc233c8411a0",
  type: "page-type/temper-lore-book",
  slug: "druid-fables-systres-beavers",
  title: "Druid Fables: Systres Beavers",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7528,
  bookIndex: 43,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2212, mapCount: 1 }],
} as const satisfies TemperLoreBook
