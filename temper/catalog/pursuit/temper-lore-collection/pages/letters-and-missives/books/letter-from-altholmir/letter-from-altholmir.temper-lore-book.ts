import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromAltholmir = {
  id: "01a0d5f3-0ef7-72bf-a638-de4a2b09d86a",
  type: "page-type/temper-lore-book",
  slug: "letter-from-altholmir",
  title: "Letter from Altholmir",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1210,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
