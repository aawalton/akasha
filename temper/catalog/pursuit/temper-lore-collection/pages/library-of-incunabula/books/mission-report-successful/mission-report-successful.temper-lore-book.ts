import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const missionReportSuccessful = {
  id: "01a0d5f8-02f9-771e-9b91-8fb1e21ce0ab",
  type: "page-type/temper-lore-book",
  slug: "mission-report-successful",
  title: "Mission Report: Successful",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 7473,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
