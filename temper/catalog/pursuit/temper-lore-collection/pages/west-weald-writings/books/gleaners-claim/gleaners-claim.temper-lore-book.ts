import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gleanersClaim = {
  id: "01a0d60d-4aaf-71b8-aacc-dd6034cd216d",
  type: "page-type/temper-lore-book",
  slug: "gleaners-claim",
  title: "Gleaner's Claim",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8143,
  bookIndex: 88,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
