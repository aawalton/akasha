import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const toTheTraitorOfSaintsport = {
  id: "01a0d5f7-73fb-7ac2-9048-ee233f85fb80",
  type: "page-type/temper-lore-book",
  slug: "to-the-traitor-of-saintsport",
  title: "To the Traitor of Saintsport",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3686,
  bookIndex: 99,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
