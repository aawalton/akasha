import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theEbonMage = {
  id: "01a0d5f4-07b9-7512-91ad-4bf9db15c378",
  type: "page-type/temper-lore-book",
  slug: "the-ebon-mage",
  title: "The Ebon Mage",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 462,
  bookIndex: 5,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
