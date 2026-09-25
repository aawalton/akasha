import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const howLong = {
  id: "01a0d5f2-253a-710e-87e4-f886e4c3e958",
  type: "page-type/temper-lore-book",
  slug: "how-long",
  title: "How Long?",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 2754,
  bookIndex: 83,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
