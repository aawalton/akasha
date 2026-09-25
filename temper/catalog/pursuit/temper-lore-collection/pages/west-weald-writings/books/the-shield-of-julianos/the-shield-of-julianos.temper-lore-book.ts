import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theShieldOfJulianos = {
  id: "01a0d60d-4ab0-779b-913e-707ea7be6ede",
  type: "page-type/temper-lore-book",
  slug: "the-shield-of-julianos",
  title: "The Shield of Julianos",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8130,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
} as const satisfies TemperLoreBook
