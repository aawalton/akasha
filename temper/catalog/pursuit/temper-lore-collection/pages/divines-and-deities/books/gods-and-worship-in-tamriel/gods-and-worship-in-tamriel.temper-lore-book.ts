import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const godsAndWorshipInTamriel = {
  id: "01a0d5e3-944d-7e9b-861d-f1d2d5351c9d",
  type: "page-type/temper-lore-book",
  slug: "gods-and-worship-in-tamriel",
  title: "Gods and Worship In Tamriel",
  collection: "temper-lore-collection/divines-and-deities",
  bookIndex: 9,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
