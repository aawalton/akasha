import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const reachBedtimeStories = {
  id: "01a0d60b-c958-7779-a2ce-dc30e589b001",
  type: "page-type/temper-lore-book",
  slug: "reach-bedtime-stories",
  title: "Reach Bedtime Stories",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6386,
  bookIndex: 60,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
