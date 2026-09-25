import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theOmenOfDeception = {
  id: "01a0d5f2-253b-7b1b-9441-311a1499ca30",
  type: "page-type/temper-lore-book",
  slug: "the-omen-of-deception",
  title: "The Omen of Deception",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 930,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
