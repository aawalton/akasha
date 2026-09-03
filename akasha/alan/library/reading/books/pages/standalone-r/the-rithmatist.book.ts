import type { Book } from "../../book.page-type.ts"

export const theRithmatist = {
  id: "019db533-f39d-7273-80b0-eb874d10a945",
  pageTypeSlug: "book",
  slug: "the-rithmatist",
  title: "The Rithmatist",
  kind: "read",
  status: "not-started",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 3,
  ownLength: 93000,
} as const satisfies Book
