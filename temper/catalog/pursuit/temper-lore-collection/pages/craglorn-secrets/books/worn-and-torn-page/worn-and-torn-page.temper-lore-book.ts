import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wornAndTornPage = {
  id: "01a0d5f1-c91c-7bfe-bb5e-0df7b0b1b6c5",
  type: "page-type/temper-lore-book",
  slug: "worn-and-torn-page",
  title: "Worn and Torn Page",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2544,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
