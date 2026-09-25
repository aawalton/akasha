import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const glyphsAndEnchantment = {
  id: "01a0d5f6-6d40-7383-a5ed-9d2af6d08e9b",
  type: "page-type/temper-lore-book",
  slug: "glyphs-and-enchantment",
  title: "Glyphs and Enchantment",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 2440,
  bookIndex: 73,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 9, mapCount: 22 },
    { mapId: 10, mapCount: 21 },
    { mapId: 12, mapCount: 11 },
    { mapId: 13, mapCount: 27 },
    { mapId: 22, mapCount: 20 },
    { mapId: 26, mapCount: 25 },
    { mapId: 27, mapCount: 5 },
    { mapId: 30, mapCount: 7 },
    { mapId: 61, mapCount: 12 },
    { mapId: 300, mapCount: 43 },
    { mapId: 1126, mapCount: 8 },
  ],
} as const satisfies TemperLoreBook
