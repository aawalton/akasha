import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const firandilsScholariumExperience = {
  id: "01a0d60d-9a63-7f5e-976c-3dd871c7de5b",
  type: "page-type/temper-lore-book",
  slug: "firandils-scholarium-experience",
  title: "Firandil's Scholarium Experience",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8209,
  bookIndex: 37,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
