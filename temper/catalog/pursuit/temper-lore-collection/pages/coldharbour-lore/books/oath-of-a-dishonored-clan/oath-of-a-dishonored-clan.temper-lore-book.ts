import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const oathOfADishonoredClan = {
  id: "01a0d5e5-15ef-7ee6-81f2-fa73f46ccfa7",
  type: "page-type/temper-lore-book",
  slug: "oath-of-a-dishonored-clan",
  title: "Oath of a Dishonored Clan",
  collection: "temper-lore-collection/coldharbour-lore",
  bookIndex: 9,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
