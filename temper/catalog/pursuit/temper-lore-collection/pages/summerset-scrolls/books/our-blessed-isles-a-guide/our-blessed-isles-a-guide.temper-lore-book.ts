import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ourBlessedIslesAGuide = {
  id: "01a0d60a-d5bd-71ec-854e-28f256d31923",
  type: "page-type/temper-lore-book",
  slug: "our-blessed-isles-a-guide",
  title: "Our Blessed Isles: A Guide",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5117,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
