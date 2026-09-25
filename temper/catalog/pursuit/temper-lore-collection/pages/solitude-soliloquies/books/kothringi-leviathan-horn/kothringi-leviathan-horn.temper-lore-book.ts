import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kothringiLeviathanHorn = {
  id: "01a0d60b-8108-7e5c-b899-80dc95cf036a",
  type: "page-type/temper-lore-book",
  slug: "kothringi-leviathan-horn",
  title: "Kothringi Leviathan Horn",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6104,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
