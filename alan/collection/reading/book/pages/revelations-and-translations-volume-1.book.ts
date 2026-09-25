import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const revelationsAndTranslationsVolume1 = {
  id: "019db533-f39d-73fa-bf2b-546b4fd5a563",
  type: "page-type/book",
  slug: "revelations-and-translations-volume-1",
  title: "Revelations and Translations Volume 1",
  status: "not-started",
  author: "Bible",
  unit: "unit/words",
  position: 1,
} as const satisfies Book
