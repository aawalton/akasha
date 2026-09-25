import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const shippingLabel = {
  id: "01a0d60c-baf3-7dd3-bbb3-2214c3f384bb",
  type: "page-type/temper-lore-book",
  slug: "shipping-label",
  title: "Shipping Label",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7285,
  bookIndex: 6,
  charted: true,
  quest: 6847,
  positions: "jsonl",
} as const satisfies TemperLoreBook
