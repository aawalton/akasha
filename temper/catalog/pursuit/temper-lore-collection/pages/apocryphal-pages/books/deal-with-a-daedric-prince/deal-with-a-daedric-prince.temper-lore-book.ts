import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dealWithADaedricPrince = {
  id: "01a0d60d-156d-7605-b234-beefff0ce63f",
  type: "page-type/temper-lore-book",
  slug: "deal-with-a-daedric-prince",
  title: "Deal with a Daedric Prince",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7420,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
