import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const callingAllAntiquarians = {
  id: "01a0d60b-a361-7502-a00c-541c62fb3326",
  type: "page-type/temper-lore-book",
  slug: "calling-all-antiquarians",
  title: "Calling All Antiquarians!",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6036,
  bookIndex: 10,
  charted: true,
  quest: 6514,
  positions: "jsonl",
  createdAt: "2026-09-25T00:51:22.081Z",
  updatedAt: "2026-09-25T00:51:23.000Z",
} as const satisfies TemperLoreBook
