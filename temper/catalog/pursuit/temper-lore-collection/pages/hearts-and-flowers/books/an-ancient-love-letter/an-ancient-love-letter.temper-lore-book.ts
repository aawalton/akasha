import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anAncientLoveLetter = {
  id: "01a0d5f2-af6f-74e4-b03a-ba113f45fb2f",
  type: "page-type/temper-lore-book",
  slug: "an-ancient-love-letter",
  title: "An Ancient Love Letter",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 2092,
  bookIndex: 61,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
