import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const saveMyPrecious = {
  id: "01a0d60b-fdb1-7770-9dc7-959add62fe2c",
  type: "page-type/temper-lore-book",
  slug: "save-my-precious",
  title: "Save My Precious",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6757,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
