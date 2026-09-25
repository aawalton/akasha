import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const treatiseOnMetallurgicalAnomalies = {
  id: "01a0d5f6-6d42-7bd5-8655-062675d745ec",
  type: "page-type/temper-lore-book",
  slug: "treatise-on-metallurgical-anomalies",
  title: "Treatise on Metallurgical Anomalies",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 1285,
  bookIndex: 82,
  charted: true,
  quest: 4138,
  positions: "jsonl",
} as const satisfies TemperLoreBook
