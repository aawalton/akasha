import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const notesOfLovirithelTheSage = {
  id: "01a0d60b-fdb0-7bc4-9915-52109035528d",
  type: "page-type/temper-lore-book",
  slug: "notes-of-lovirithel-the-sage",
  title: "Notes of Lovirithel the Sage",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6694,
  bookIndex: 21,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
