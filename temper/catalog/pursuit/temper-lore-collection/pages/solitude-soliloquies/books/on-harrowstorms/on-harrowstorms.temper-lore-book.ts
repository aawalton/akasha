import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onHarrowstorms = {
  id: "01a0d60b-8108-7aea-b7e2-503d03a24bf8",
  type: "page-type/temper-lore-book",
  slug: "on-harrowstorms",
  title: "On Harrowstorms",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6223,
  bookIndex: 49,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
