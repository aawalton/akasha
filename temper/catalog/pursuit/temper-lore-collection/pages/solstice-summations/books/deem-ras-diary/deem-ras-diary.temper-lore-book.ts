import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const deemRasDiary = {
  id: "01a0d60d-ff69-7f96-b0fb-a05a46932da1",
  type: "page-type/temper-lore-book",
  slug: "deem-ras-diary",
  title: "Deem-Ra's Diary",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8460,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
