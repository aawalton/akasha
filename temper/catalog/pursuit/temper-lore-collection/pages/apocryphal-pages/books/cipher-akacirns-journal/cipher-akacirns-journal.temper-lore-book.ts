import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const cipherAkacirnsJournal = {
  id: "01a0d60d-156d-71bd-adb8-710a3d7dd34d",
  type: "page-type/temper-lore-book",
  slug: "cipher-akacirns-journal",
  title: "Cipher Akacirn's Journal",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7690,
  bookIndex: 54,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
