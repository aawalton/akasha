import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const slayersNote = {
  id: "01a0d60c-18bd-7f0d-a678-325c0cc6794b",
  type: "page-type/temper-lore-book",
  slug: "slayers-note",
  title: "Slayer's Note",
  collection: "temper-lore-collection/the-impresarios-catalogue",
  bookIndex: 13,
} as const satisfies TemperLoreBook
