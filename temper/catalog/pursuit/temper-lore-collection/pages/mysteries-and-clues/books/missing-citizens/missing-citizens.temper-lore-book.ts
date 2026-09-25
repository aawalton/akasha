import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const missingCitizens = {
  id: "01a0d5f4-07b8-740d-8d3f-b4875d4eff2c",
  type: "page-type/temper-lore-book",
  slug: "missing-citizens",
  title: "Missing Citizens",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 885,
  bookIndex: 17,
  charted: true,
  quest: 4355,
  positions: "jsonl",
} as const satisfies TemperLoreBook
