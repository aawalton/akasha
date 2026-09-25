import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mannimarcosDirective = {
  id: "01a0d60e-45b2-72d1-8466-0e5bc064e1bb",
  type: "page-type/temper-lore-book",
  slug: "mannimarcos-directive",
  title: "Mannimarco's Directive",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8527,
  bookIndex: 20,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
