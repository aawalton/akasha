import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToWyressGwen = {
  id: "01a0d5f3-0ef8-777c-a016-b02c4685ee8c",
  type: "page-type/temper-lore-book",
  slug: "letter-to-wyress-gwen",
  title: "Letter to Wyress Gwen",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2936,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
