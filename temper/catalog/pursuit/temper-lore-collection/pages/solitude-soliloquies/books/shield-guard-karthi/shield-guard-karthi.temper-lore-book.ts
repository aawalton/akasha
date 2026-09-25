import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const shieldGuardKarthi = {
  id: "01a0d60b-8109-7078-a19d-a76bab8cc6d6",
  type: "page-type/temper-lore-book",
  slug: "shield-guard-karthi",
  title: "Shield-Guard Karthi",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5742,
  bookIndex: 83,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
