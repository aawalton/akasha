import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ferharasWarclaws = {
  id: "01a0d5f7-aa98-73ed-bf43-b307c907ed86",
  type: "page-type/temper-lore-book",
  slug: "ferharas-warclaws",
  title: "Ferhara's Warclaws",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4553,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
