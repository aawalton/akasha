import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theKnightingCeremony = {
  id: "01a0d5f5-444c-7ccd-a224-bd7df81749f5",
  type: "page-type/temper-lore-book",
  slug: "the-knighting-ceremony",
  title: "The Knighting Ceremony",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 840,
  bookIndex: 25,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
