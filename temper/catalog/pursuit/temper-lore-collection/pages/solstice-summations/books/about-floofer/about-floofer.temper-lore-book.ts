import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aboutFloofer = {
  id: "01a0d60d-ff69-7fb6-9a86-32f8e420f7bb",
  type: "page-type/temper-lore-book",
  slug: "about-floofer",
  title: "About Floofer",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8538,
  bookIndex: 73,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
