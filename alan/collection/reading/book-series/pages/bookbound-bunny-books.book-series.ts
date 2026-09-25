import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const bookboundBunnyBooks = {
  id: "019db533-f389-721b-a00a-98da800487a3",
  type: "page-type/book-series",
  slug: "bookbound-bunny-books",
  title: "Bookbound Bunny Books",
  status: "not-started",
  unit: "unit/words",
} as const satisfies BookSeries
