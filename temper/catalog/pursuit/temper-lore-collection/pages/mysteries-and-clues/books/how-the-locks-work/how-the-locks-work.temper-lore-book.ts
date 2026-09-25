import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const howTheLocksWork = {
  id: "01a0d5f4-07b8-7261-8142-a394b1426c3a",
  type: "page-type/temper-lore-book",
  slug: "how-the-locks-work",
  title: "How the Locks Work",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 1746,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
