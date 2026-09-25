import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const strangeRitualsOfTheOrsimer = {
  id: "01a0d5f7-160b-79f4-ac67-c51fcefd1f92",
  type: "page-type/temper-lore-book",
  slug: "strange-rituals-of-the-orsimer",
  title: "Strange Rituals of the Orsimer",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 3221,
  bookIndex: 12,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
