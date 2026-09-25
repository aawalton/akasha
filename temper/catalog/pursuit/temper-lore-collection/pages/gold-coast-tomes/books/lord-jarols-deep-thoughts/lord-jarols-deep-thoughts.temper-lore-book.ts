import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lordJarolsDeepThoughts = {
  id: "01a0d5f7-73fa-7ac3-8621-62298a317358",
  type: "page-type/temper-lore-book",
  slug: "lord-jarols-deep-thoughts",
  title: "Lord Jarol's Deep Thoughts",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3736,
  bookIndex: 77,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
