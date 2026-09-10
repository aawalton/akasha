import type { BookSeries } from "../book-series.page-type.types.ts"

export const bookboundBunnyBooks = {
  id: "019db533-f389-721b-a00a-98da800487a3",
  pageTypeSlug: "book-series",
  type: "book-series",
  slug: "bookbound-bunny-books",
  title: "Bookbound Bunny Books",
  status: "not-started",
  unit: "words",
} as const satisfies BookSeries
