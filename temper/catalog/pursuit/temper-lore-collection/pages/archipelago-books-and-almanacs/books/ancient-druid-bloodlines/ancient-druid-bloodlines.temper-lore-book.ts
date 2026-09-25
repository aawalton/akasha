import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ancientDruidBloodlines = {
  id: "01a0d60c-baf2-746f-9b44-eac37e377e4b",
  type: "page-type/temper-lore-book",
  slug: "ancient-druid-bloodlines",
  title: "Ancient Druid Bloodlines",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7289,
  bookIndex: 8,
  charted: true,
  quest: 6847,
  positions: "jsonl",
} as const satisfies TemperLoreBook
