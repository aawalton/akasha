import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTrueNatureOfMagnar = {
  id: "01a0d5f6-d68c-713d-aa7d-fb5e312acff8",
  type: "page-type/temper-lore-book",
  slug: "the-true-nature-of-magnar",
  title: "The True Nature of Magnar",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3007,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
