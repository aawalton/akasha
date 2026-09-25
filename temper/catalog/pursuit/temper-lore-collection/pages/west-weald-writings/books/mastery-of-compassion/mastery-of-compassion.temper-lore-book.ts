import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const masteryOfCompassion = {
  id: "01a0d60d-4aaf-733c-8b70-6e261a86c81e",
  type: "page-type/temper-lore-book",
  slug: "mastery-of-compassion",
  title: "Mastery of Compassion",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7791,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
