import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const firesGrip = {
  id: "01a0d5f4-3c11-7a7a-a411-5650fcccaf4c",
  type: "page-type/temper-lore-book",
  slug: "fires-grip",
  title: "Fire's Grip",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2455,
  bookIndex: 99,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
