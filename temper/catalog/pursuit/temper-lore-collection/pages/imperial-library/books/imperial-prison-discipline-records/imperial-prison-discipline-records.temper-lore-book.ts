import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const imperialPrisonDisciplineRecords = {
  id: "01a0d5f6-f385-7a7c-b934-f3d88e538c31",
  type: "page-type/temper-lore-book",
  slug: "imperial-prison-discipline-records",
  title: "Imperial Prison Discipline Records",
  collection: "temper-lore-collection/imperial-library",
  esoBookId: 2831,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
