import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSeaGiantsLanding = {
  id: "01a0d60b-a362-791a-824c-e651a11ac1c0",
  type: "page-type/temper-lore-book",
  slug: "the-sea-giants-landing",
  title: "The Sea Giant's Landing",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6033,
  bookIndex: 7,
  charted: true,
  quest: 6509,
  positions: "jsonl",
} as const satisfies TemperLoreBook
