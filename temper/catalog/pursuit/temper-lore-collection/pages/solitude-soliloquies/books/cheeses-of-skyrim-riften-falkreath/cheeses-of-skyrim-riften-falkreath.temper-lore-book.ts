import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const cheesesOfSkyrimRiftenFalkreath = {
  id: "01a0d60b-8107-7186-a155-18abdf579d8e",
  type: "page-type/temper-lore-book",
  slug: "cheeses-of-skyrim-riften-falkreath",
  title: "Cheeses of Skyrim: Riften, Falkreath",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6072,
  bookIndex: 56,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
