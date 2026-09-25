import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const deliveryConfirmation = {
  id: "01a0d60d-4aaf-743d-ad12-79c9dd5cb5b6",
  type: "page-type/temper-lore-book",
  slug: "delivery-confirmation",
  title: "Delivery Confirmation",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7876,
  bookIndex: 23,
  charted: true,
  quest: 7180,
  positions: "jsonl",
} as const satisfies TemperLoreBook
