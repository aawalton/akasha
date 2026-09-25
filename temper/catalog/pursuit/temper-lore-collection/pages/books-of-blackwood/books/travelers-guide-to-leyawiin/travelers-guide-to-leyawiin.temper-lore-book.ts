import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const travelersGuideToLeyawiin = {
  id: "01a0d60b-fdb1-7802-b8d4-7a810d21e0e4",
  type: "page-type/temper-lore-book",
  slug: "travelers-guide-to-leyawiin",
  title: "Traveler's Guide to Leyawiin",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6750,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
