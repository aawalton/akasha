import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const corelanyaLoveSong = {
  id: "01a0d60d-ff69-7044-9096-7170e82b7adc",
  type: "page-type/temper-lore-book",
  slug: "corelanya-love-song",
  title: "Corelanya Love Song",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8493,
  bookIndex: 62,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2603, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
