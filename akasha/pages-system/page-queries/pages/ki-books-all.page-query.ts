import type { PageQuery } from "../page-query.page-type.ts"

export const kiBooksAll = {
  id: "01a063f9-220b-7285-95af-a0beb1c50dec",
  pageTypeSlug: "page-query",
  slug: "ki-books-all",
  asksOfSlug: "ki-book",
  keys: ["slug", "title", "author", "isbn", "isbn13", "publisher", "originalPublicationYear"],
} as const satisfies PageQuery
