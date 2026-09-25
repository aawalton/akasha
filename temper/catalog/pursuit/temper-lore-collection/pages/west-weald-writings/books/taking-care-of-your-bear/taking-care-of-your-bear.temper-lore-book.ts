import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const takingCareOfYourBear = {
  id: "01a0d60d-4ab0-7847-bb4b-1a1e6edd7c47",
  type: "page-type/temper-lore-book",
  slug: "taking-care-of-your-bear",
  title: "Taking Care of Your Bear",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8128,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
