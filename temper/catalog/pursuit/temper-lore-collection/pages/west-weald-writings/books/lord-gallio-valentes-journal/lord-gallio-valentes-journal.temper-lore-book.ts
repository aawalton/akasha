import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lordGallioValentesJournal = {
  id: "01a0d60d-4aaf-784c-b627-895189943bd7",
  type: "page-type/temper-lore-book",
  slug: "lord-gallio-valentes-journal",
  title: "Lord Gallio Valente's Journal",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7837,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
