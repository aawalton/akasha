import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const newCultOrAncientReligion = {
  id: "01a0d60b-4e03-7a6b-a00b-c35481187e96",
  type: "page-type/temper-lore-book",
  slug: "new-cult-or-ancient-religion",
  title: "New Cult or Ancient Religion?",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5875,
  bookIndex: 68,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
