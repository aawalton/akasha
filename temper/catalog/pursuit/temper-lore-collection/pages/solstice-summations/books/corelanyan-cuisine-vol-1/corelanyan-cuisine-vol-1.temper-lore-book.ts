import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const corelanyanCuisineVol1 = {
  id: "01a0d60d-ff69-7436-80ca-8afebe376662",
  type: "page-type/temper-lore-book",
  slug: "corelanyan-cuisine-vol-1",
  title: "Corelanyan Cuisine, Vol. 1",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8495,
  bookIndex: 64,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
