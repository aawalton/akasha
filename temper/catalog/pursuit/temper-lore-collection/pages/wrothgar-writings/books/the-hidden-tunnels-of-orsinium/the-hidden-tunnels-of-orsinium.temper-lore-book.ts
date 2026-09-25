import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theHiddenTunnelsOfOrsinium = {
  id: "01a0d5f6-d68c-7c75-a9f4-7ed1d3b47d15",
  type: "page-type/temper-lore-book",
  slug: "the-hidden-tunnels-of-orsinium",
  title: "The Hidden Tunnels of Orsinium",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3197,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
