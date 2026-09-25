import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const doombringerCeldinasTestament = {
  id: "01a0d60c-40bf-72d7-9181-8169759f8552",
  type: "page-type/temper-lore-book",
  slug: "doombringer-celdinas-testament",
  title: "Doombringer Celdina's Testament",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6760,
  bookIndex: 16,
  charted: true,
  quest: 6699,
  positions: "jsonl",
} as const satisfies TemperLoreBook
