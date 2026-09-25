import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const jsaadsNote = {
  id: "01a0d60b-4e02-7df5-b65f-94825504eac4",
  type: "page-type/temper-lore-book",
  slug: "jsaads-note",
  title: "J'saad's Note",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5709,
  bookIndex: 5,
  charted: true,
  quest: 6445,
  positions: "jsonl",
} as const satisfies TemperLoreBook
