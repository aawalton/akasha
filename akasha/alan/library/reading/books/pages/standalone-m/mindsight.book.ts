import type { Book } from "../../book.page-type.ts"

export const mindsight = {
  id: "019db533-f39e-70c5-93b8-e764ea3bcc4e",
  pageTypeSlug: "book",
  slug: "mindsight",
  title: "Mindsight",
  kind: "read",
  status: "not-started",
  author: "Daniel J. Siegel",
  unitSlug: "words",
  ownLength: 176250,
} as const satisfies Book
