import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const trinimacHouseIdol = {
  id: "01a0d5f6-d68c-7754-997f-c55424337c5e",
  type: "page-type/temper-lore-book",
  slug: "trinimac-house-idol",
  title: "Trinimac House Idol",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3114,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
