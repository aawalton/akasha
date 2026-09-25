import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dremoraStoriesAboutMortals = {
  id: "01a0d60c-40bf-79c7-a32a-3af351a2c73f",
  type: "page-type/temper-lore-book",
  slug: "dremora-stories-about-mortals",
  title: "Dremora Stories About Mortals",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 7006,
  bookIndex: 60,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
