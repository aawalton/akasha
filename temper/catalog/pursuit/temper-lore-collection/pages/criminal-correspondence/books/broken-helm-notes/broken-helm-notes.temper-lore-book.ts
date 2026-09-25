import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const brokenHelmNotes = {
  id: "01a0d5f1-f450-75ef-a4d8-f2708c53cc32",
  type: "page-type/temper-lore-book",
  slug: "broken-helm-notes",
  title: "Broken Helm Notes",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 2089,
  bookIndex: 77,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
