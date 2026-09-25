import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const logbookOfDruidBetrys = {
  id: "01a0d5f8-02f8-73d3-868f-d09950209562",
  type: "page-type/temper-lore-book",
  slug: "logbook-of-druid-betrys",
  title: "Logbook of Druid Betrys",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 7196,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
