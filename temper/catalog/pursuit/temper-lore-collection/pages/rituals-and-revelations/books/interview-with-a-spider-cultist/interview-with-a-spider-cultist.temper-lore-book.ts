import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const interviewWithASpiderCultist = {
  id: "01a0d5f5-444b-7340-a843-e9643d60f834",
  type: "page-type/temper-lore-book",
  slug: "interview-with-a-spider-cultist",
  title: "Interview with a Spider Cultist",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 324,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
