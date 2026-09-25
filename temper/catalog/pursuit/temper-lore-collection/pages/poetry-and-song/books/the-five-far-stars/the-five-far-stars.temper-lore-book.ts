import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFiveFarStars = {
  id: "01a0d5e4-38b2-760c-b399-2866616663a0",
  type: "page-type/temper-lore-book",
  slug: "the-five-far-stars",
  title: "The Five Far Stars",
  collection: "temper-lore-collection/poetry-and-song",
  bookIndex: 4,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
