import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const strangeRiddle = {
  id: "01a0d5f1-c91b-734c-a5f8-8760de198a9c",
  type: "page-type/temper-lore-book",
  slug: "strange-riddle",
  title: "Strange Riddle",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2392,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
