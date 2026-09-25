import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ifYouCanReadThisOpenIt = {
  id: "01a0d5f5-1384-7eeb-99cf-03c16ccb0dbb",
  type: "page-type/temper-lore-book",
  slug: "if-you-can-read-this-open-it",
  title: "If You Can Read This, Open It",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 889,
  bookIndex: 30,
  charted: true,
  quest: 4352,
  positions: "jsonl",
} as const satisfies TemperLoreBook
