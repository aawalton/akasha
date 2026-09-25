import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const yourServicesAreRequired = {
  id: "01a0d60d-4ab1-7407-afbc-1feb5775ad9c",
  type: "page-type/temper-lore-book",
  slug: "your-services-are-required",
  title: "Your Services Are Required",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7889,
  bookIndex: 26,
  charted: true,
  quest: 7180,
  positions: "jsonl",
} as const satisfies TemperLoreBook
