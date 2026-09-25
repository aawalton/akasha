import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sisterElrasProclamation = {
  id: "01a0d60b-8109-774b-bdf8-49b8a016ceab",
  type: "page-type/temper-lore-book",
  slug: "sister-elras-proclamation",
  title: "Sister Elra's Proclamation",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5986,
  bookIndex: 18,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
