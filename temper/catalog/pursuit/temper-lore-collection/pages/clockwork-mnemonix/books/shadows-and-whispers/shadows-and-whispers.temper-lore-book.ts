import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const shadowsAndWhispers = {
  id: "01a0d60a-a214-7e8f-9236-8212cf6b1053",
  type: "page-type/temper-lore-book",
  slug: "shadows-and-whispers",
  title: "Shadows and Whispers",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4611,
  bookIndex: 15,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
