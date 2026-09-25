import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToFiniaMarcott = {
  id: "01a0d5f3-0ef8-7d10-b3dd-0670252a4e14",
  type: "page-type/temper-lore-book",
  slug: "letter-to-finia-marcott",
  title: "Letter to Finia Marcott",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2984,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
