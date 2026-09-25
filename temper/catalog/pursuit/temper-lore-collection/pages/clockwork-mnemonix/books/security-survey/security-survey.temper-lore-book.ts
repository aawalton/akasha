import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const securitySurvey = {
  id: "01a0d60a-a214-7ff0-9e88-d309068eb151",
  type: "page-type/temper-lore-book",
  slug: "security-survey",
  title: "Security Survey",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4588,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
