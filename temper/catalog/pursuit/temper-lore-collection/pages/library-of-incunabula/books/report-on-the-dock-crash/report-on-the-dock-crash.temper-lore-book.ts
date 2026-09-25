import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const reportOnTheDockCrash = {
  id: "01a0d5f8-02f9-75c6-a74d-477c7d6f107f",
  type: "page-type/temper-lore-book",
  slug: "report-on-the-dock-crash",
  title: "Report on the Dock Crash",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 6864,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
