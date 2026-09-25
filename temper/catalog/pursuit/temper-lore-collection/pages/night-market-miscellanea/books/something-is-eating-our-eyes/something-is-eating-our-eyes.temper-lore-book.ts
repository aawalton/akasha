import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const somethingIsEatingOurEyes = {
  id: "01a0d60e-687f-7161-b78c-f5606ce9736d",
  type: "page-type/temper-lore-book",
  slug: "something-is-eating-our-eyes",
  title: "Something Is Eating Our Eyes",
  collection: "temper-lore-collection/night-market-miscellanea",
  esoBookId: 8739,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
