import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const varensCallToArms = {
  id: "01a0d60d-4ab0-7c4f-8a81-76e897e5a18a",
  type: "page-type/temper-lore-book",
  slug: "varens-call-to-arms",
  title: "Varen's Call to Arms",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7836,
  bookIndex: 67,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
