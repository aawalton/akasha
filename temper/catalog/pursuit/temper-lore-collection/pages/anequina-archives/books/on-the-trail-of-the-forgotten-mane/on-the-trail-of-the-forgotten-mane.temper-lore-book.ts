import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onTheTrailOfTheForgottenMane = {
  id: "01a0d60b-2345-7e79-914e-976606f70dc8",
  type: "page-type/temper-lore-book",
  slug: "on-the-trail-of-the-forgotten-mane",
  title: "On the Trail of the Forgotten Mane",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5592,
  bookIndex: 50,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
