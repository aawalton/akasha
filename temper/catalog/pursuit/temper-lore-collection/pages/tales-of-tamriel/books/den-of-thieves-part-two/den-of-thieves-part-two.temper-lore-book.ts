import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const denOfThievesPartTwo = {
  id: "01a0d5f5-7766-74a8-ad37-7f486d4a7c68",
  type: "page-type/temper-lore-book",
  slug: "den-of-thieves-part-two",
  title: "Den of Thieves, Part Two",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1869,
  bookIndex: 82,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
