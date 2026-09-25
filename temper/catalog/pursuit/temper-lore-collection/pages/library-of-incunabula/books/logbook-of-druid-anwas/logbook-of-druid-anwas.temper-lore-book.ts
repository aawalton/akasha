import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const logbookOfDruidAnwas = {
  id: "01a0d5f8-02f8-7db5-8635-c574963cbc1e",
  type: "page-type/temper-lore-book",
  slug: "logbook-of-druid-anwas",
  title: "Logbook of Druid Anwas",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 7195,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
