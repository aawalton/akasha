import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dontMessThisUp = {
  id: "01a0d5f1-f451-791a-ab73-a17b03fccf1a",
  type: "page-type/temper-lore-book",
  slug: "dont-mess-this-up",
  title: "Don't Mess This Up",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1209,
  bookIndex: 38,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
