import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const braveLittleScribAndTheRiverTroll = {
  id: "01a0d60c-eb9a-7fa3-81b9-de829486f2dc",
  type: "page-type/temper-lore-book",
  slug: "brave-little-scrib-and-the-river-troll",
  title: "Brave Little Scrib and the River Troll",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7446,
  bookIndex: 44,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2274, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
