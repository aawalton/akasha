import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rheasLetter = {
  id: "01a0d5f3-0ef8-799e-a162-6e93d0c8bbe0",
  type: "page-type/temper-lore-book",
  slug: "rheas-letter",
  title: "Rhea's Letter",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 4065,
  charted: true,
  quest: 5935,
  positions: "jsonl",
  createdAt: "2026-09-25T00:24:31.224Z",
  updatedAt: "2026-09-25T00:24:33.000Z",
} as const satisfies TemperLoreBook
