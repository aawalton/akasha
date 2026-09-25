import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const argoniansOfWesternSolstice = {
  id: "01a0d60d-ff69-789a-85ba-2a213ab101b0",
  type: "page-type/temper-lore-book",
  slug: "argonians-of-western-solstice",
  title: "Argonians of Western Solstice",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8491,
  bookIndex: 60,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
