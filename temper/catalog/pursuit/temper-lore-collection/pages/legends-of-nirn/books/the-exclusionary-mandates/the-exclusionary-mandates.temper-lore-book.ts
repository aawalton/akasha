import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theExclusionaryMandates = {
  id: "01a0d5e3-d584-7607-ad64-ebbd74589572",
  type: "page-type/temper-lore-book",
  slug: "the-exclusionary-mandates",
  title: "The Exclusionary Mandates",
  collection: "temper-lore-collection/legends-of-nirn",
  bookIndex: 5,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
