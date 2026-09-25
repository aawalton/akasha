import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const stormhavenBlusterRejectionNotice = {
  id: "01a0d5f3-0ef8-7159-a11b-ac66b7e14e7b",
  type: "page-type/temper-lore-book",
  slug: "stormhaven-bluster-rejection-notice",
  title: "Stormhaven Bluster Rejection Notice",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2982,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
