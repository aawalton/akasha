import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const jadarriTheEndless = {
  id: "01a0d60b-4e02-7af9-92ee-9ea750508b32",
  type: "page-type/temper-lore-book",
  slug: "jadarri-the-endless",
  title: "Ja'darri the Endless",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5711,
  bookIndex: 20,
  charted: true,
  quest: 6403,
  positions: "jsonl",
} as const satisfies TemperLoreBook
