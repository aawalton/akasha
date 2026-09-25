import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aboutThatDoll = {
  id: "01a0d60b-a361-7acf-8374-c4951d64d95c",
  type: "page-type/temper-lore-book",
  slug: "about-that-doll",
  title: "About That Doll",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6042,
  bookIndex: 15,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
