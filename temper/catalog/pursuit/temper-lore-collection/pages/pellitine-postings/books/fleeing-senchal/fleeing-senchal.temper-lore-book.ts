import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fleeingSenchal = {
  id: "01a0d60b-4e02-7f41-b8e9-9816540e215f",
  type: "page-type/temper-lore-book",
  slug: "fleeing-senchal",
  title: "Fleeing Senchal",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5767,
  bookIndex: 32,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
