import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const bookboundBunnyBooks = {
  id: "019db533-f389-721b-a00a-98da800487a3",
  type: "page-type/book-series",
  slug: "bookbound-bunny-books",
  title: "Bookbound Bunny Books",
  status: "not-started",
  unit: "unit/words",
  createdAt: "2026-04-22T12:39:34.025Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
