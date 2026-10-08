import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nightRunnerCaptainsJournal = {
  id: "01a0d60a-d5bd-7f0d-932a-1a950f4956b6",
  type: "page-type/temper-lore-book",
  slug: "night-runner-captains-journal",
  title: "Night Runner Captain's Journal",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4922,
  bookIndex: 45,
  charted: true,
  quest: 6165,
  positions: "jsonl",
  createdAt: "2026-09-25T00:50:29.437Z",
  updatedAt: "2026-09-25T00:50:31.000Z",
} as const satisfies TemperLoreBook
