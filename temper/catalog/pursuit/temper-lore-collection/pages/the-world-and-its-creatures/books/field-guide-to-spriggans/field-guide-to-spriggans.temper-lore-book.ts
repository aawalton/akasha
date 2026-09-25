import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fieldGuideToSpriggans = {
  id: "01a0d5f5-f3e3-7c90-b4b0-b57ff7a83029",
  type: "page-type/temper-lore-book",
  slug: "field-guide-to-spriggans",
  title: "Field Guide to Spriggans",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1881,
  bookIndex: 50,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
