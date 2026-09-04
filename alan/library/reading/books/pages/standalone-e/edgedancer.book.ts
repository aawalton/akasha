import type { Book } from "../../book.page-type.ts"

export const edgedancer = {
  id: "019db533-f39d-7065-9ba7-dbbbb72d001e",
  pageTypeSlug: "book",
  slug: "edgedancer",
  title: "Edgedancer",
  kind: "read",
  status: "not-started",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 3,
  ownLength: 33500,
} as const satisfies Book
