import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const howWeCameToFly = {
  id: "01a0d60b-4e02-7e35-bbc6-e2dac7e9d721",
  type: "page-type/temper-lore-book",
  slug: "how-we-came-to-fly",
  title: "How We Came to Fly",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5700,
  bookIndex: 17,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
