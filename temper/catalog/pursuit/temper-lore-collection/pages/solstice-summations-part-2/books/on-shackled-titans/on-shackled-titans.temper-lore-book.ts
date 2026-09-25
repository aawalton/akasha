import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onShackledTitans = {
  id: "01a0d60e-45b3-7584-a879-1c0a0b039f89",
  type: "page-type/temper-lore-book",
  slug: "on-shackled-titans",
  title: "On Shackled Titans",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8622,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
