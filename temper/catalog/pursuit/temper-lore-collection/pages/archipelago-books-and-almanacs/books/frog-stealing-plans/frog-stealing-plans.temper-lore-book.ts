import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const frogStealingPlans = {
  id: "01a0d60c-baf3-7cc2-b69d-d4c7b418a329",
  type: "page-type/temper-lore-book",
  slug: "frog-stealing-plans",
  title: "Frog Stealing Plans",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7362,
  bookIndex: 24,
  charted: true,
  quest: 6904,
  positions: "jsonl",
} as const satisfies TemperLoreBook
