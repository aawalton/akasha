import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theShieldsOfSenchal = {
  id: "01a0d60b-4e03-739b-8b90-1894116e7eef",
  type: "page-type/temper-lore-book",
  slug: "the-shields-of-senchal",
  title: "The Shields of Senchal",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5870,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
