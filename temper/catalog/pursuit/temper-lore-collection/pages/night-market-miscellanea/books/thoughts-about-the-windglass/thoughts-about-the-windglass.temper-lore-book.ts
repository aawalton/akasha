import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thoughtsAboutTheWindglass = {
  id: "01a0d60e-687f-7246-9fb9-04d2ed0eaee9",
  type: "page-type/temper-lore-book",
  slug: "thoughts-about-the-windglass",
  title: "Thoughts about the Windglass",
  collection: "temper-lore-collection/night-market-miscellanea",
  esoBookId: 8705,
  bookIndex: 19,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
