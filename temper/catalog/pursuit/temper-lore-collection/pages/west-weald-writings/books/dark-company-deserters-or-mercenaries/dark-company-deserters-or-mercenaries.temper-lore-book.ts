import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const darkCompanyDesertersOrMercenaries = {
  id: "01a0d60d-4aaf-76c6-b900-ce37ae20b9a9",
  type: "page-type/temper-lore-book",
  slug: "dark-company-deserters-or-mercenaries",
  title: "Dark Company: Deserters or Mercenaries?",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8135,
  bookIndex: 100,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
