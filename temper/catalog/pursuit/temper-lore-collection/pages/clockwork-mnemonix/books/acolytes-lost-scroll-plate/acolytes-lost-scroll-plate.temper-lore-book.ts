import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const acolytesLostScrollPlate = {
  id: "01a0d60a-a212-74b4-9217-9efafd0f0d0e",
  type: "page-type/temper-lore-book",
  slug: "acolytes-lost-scroll-plate",
  title: "Acolyte's Lost Scroll Plate",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4582,
  bookIndex: 28,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
