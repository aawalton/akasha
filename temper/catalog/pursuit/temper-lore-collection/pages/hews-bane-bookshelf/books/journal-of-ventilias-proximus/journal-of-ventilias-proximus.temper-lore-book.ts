import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfVentiliasProximus = {
  id: "01a0d5f7-4293-7c4f-a15d-0e32d290104c",
  type: "page-type/temper-lore-book",
  slug: "journal-of-ventilias-proximus",
  title: "Journal of Ventilias Proximus",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3282,
  bookIndex: 46,
  charted: true,
  quest: 5532,
  positions: "jsonl",
} as const satisfies TemperLoreBook
