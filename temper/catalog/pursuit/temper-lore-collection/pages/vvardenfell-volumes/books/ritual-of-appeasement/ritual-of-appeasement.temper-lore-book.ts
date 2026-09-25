import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ritualOfAppeasement = {
  id: "01a0d5f7-aa99-7b67-90ad-1c7f6cee2831",
  type: "page-type/temper-lore-book",
  slug: "ritual-of-appeasement",
  title: "Ritual of Appeasement",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 3977,
  bookIndex: 96,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
