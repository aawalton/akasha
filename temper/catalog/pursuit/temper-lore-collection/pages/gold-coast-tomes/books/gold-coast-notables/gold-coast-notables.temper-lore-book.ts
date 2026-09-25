import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const goldCoastNotables = {
  id: "01a0d5f7-73fa-774c-86f1-ef28c39080cf",
  type: "page-type/temper-lore-book",
  slug: "gold-coast-notables",
  title: "Gold Coast Notables",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3731,
  bookIndex: 70,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
