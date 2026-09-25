import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mythsOfSheogorathVolume1 = {
  id: "01a0d5e3-e98c-7857-bf74-6d4ceb170980",
  type: "page-type/temper-lore-book",
  slug: "myths-of-sheogorath-volume-1",
  title: "Myths of Sheogorath, Volume 1",
  collection: "temper-lore-collection/literature",
  bookIndex: 5,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
