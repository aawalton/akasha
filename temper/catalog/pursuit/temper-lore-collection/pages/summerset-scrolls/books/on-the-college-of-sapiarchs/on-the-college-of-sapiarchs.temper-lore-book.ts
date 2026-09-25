import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onTheCollegeOfSapiarchs = {
  id: "01a0d60a-d5bd-7440-b525-10f4d84722d4",
  type: "page-type/temper-lore-book",
  slug: "on-the-college-of-sapiarchs",
  title: "On the College of Sapiarchs",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5111,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
