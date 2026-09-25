import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theRealmOfShadows = {
  id: "01a0d5f5-444d-70d9-98f0-5971b9f31782",
  type: "page-type/temper-lore-book",
  slug: "the-realm-of-shadows",
  title: "The Realm of Shadows",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 1600,
  bookIndex: 61,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
