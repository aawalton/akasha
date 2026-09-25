import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const crumpledNurseryRhyme = {
  id: "01a0d60b-4e02-7560-ab63-c0df44d7e3da",
  type: "page-type/temper-lore-book",
  slug: "crumpled-nursery-rhyme",
  title: "Crumpled Nursery Rhyme",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5460,
  bookIndex: 78,
  charted: true,
  quest: 6303,
  positions: "jsonl",
} as const satisfies TemperLoreBook
