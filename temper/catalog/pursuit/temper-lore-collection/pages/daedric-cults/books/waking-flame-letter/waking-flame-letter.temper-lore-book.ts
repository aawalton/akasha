import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wakingFlameLetter = {
  id: "01a0d5f2-253c-7818-b4e1-d56f9a077bcc",
  type: "page-type/temper-lore-book",
  slug: "waking-flame-letter",
  title: "Waking Flame Letter",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 6770,
  bookIndex: 98,
  charted: true,
  quest: 6701,
  positions: "jsonl",
} as const satisfies TemperLoreBook
