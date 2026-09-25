import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const travelersGuideToWestWeald = {
  id: "01a0d60d-4ab0-7c40-85cf-586fa6de94ba",
  type: "page-type/temper-lore-book",
  slug: "travelers-guide-to-west-weald",
  title: "Traveler's Guide to West Weald",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8134,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
