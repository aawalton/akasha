import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onPlayingTheFrogs = {
  id: "01a0d5f6-a29a-794e-9f14-0aeff04ed211",
  type: "page-type/temper-lore-book",
  slug: "on-playing-the-frogs",
  title: "On Playing the Frogs",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 2823,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
