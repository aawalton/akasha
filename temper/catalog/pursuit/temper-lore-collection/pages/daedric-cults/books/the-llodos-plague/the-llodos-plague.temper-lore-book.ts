import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLlodosPlague = {
  id: "01a0d5f2-253b-7b68-a289-7e4f71f20270",
  type: "page-type/temper-lore-book",
  slug: "the-llodos-plague",
  title: "The Llodos Plague",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 646,
  bookIndex: 20,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
