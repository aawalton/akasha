import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const druidFablesTheProudFaun = {
  id: "01a0d60c-baf3-78c0-938b-0e4c891dcb2b",
  type: "page-type/temper-lore-book",
  slug: "druid-fables-the-proud-faun",
  title: "Druid Fables: The Proud Faun",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7315,
  bookIndex: 25,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2212, mapCount: 1 }],
} as const satisfies TemperLoreBook
