import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noticePledgeDuties = {
  id: "01a0d5f2-83a2-7c66-9376-0054411d598d",
  type: "page-type/temper-lore-book",
  slug: "notice-pledge-duties",
  title: "Notice: Pledge Duties",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 4012,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
