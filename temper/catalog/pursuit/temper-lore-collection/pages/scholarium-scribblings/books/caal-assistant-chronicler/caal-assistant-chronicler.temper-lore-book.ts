import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const caalAssistantChronicler = {
  id: "01a0d60d-9a63-7721-8737-3018d30efbc2",
  type: "page-type/temper-lore-book",
  slug: "caal-assistant-chronicler",
  title: "Caal: Assistant Chronicler",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8207,
  bookIndex: 35,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
