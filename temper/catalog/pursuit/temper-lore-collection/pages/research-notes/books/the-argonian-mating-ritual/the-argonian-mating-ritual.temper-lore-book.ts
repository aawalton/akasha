import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theArgonianMatingRitual = {
  id: "01a0d5f5-1385-76a2-ae5a-a9e59ca99903",
  type: "page-type/temper-lore-book",
  slug: "the-argonian-mating-ritual",
  title: "The Argonian Mating Ritual",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 841,
  bookIndex: 25,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
