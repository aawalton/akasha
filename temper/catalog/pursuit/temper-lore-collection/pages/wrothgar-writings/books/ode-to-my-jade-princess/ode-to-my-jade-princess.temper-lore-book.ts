import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const odeToMyJadePrincess = {
  id: "01a0d5f6-d68b-7f15-86b2-6ee1b718c373",
  type: "page-type/temper-lore-book",
  slug: "ode-to-my-jade-princess",
  title: "Ode to My Jade Princess",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3154,
  bookIndex: 75,
  charted: true,
  quest: 5442,
  positions: "jsonl",
} as const satisfies TemperLoreBook
