import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const survivorsGuilt = {
  id: "01a0d60b-4e03-7c1b-8f18-384d43e9a119",
  type: "page-type/temper-lore-book",
  slug: "survivors-guilt",
  title: "Survivor's Guilt",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5765,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
