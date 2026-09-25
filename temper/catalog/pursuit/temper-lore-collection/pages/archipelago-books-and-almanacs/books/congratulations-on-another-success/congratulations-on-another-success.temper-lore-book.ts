import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const congratulationsOnAnotherSuccess = {
  id: "01a0d60c-baf3-7827-a764-c1c41f79ef6a",
  type: "page-type/temper-lore-book",
  slug: "congratulations-on-another-success",
  title: "Congratulations On Another Success!",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7283,
  bookIndex: 3,
  charted: true,
  quest: 6847,
  positions: "jsonl",
} as const satisfies TemperLoreBook
