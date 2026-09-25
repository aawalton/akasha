import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const talesOfAbbaArlTheOxsTale = {
  id: "01a0d5f1-c91b-7f89-926c-1707aeedb9e7",
  type: "page-type/temper-lore-book",
  slug: "tales-of-abba-arl-the-oxs-tale",
  title: "Tales of Abba Arl: The Ox's Tale",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2587,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
