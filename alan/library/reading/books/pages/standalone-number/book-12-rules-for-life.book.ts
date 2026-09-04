import type { Book } from "../../book.page-type.ts"

export const book12RulesForLife = {
  id: "019db533-f39e-7172-a6a9-0b00d645a11e",
  pageTypeSlug: "book",
  slug: "book-12-rules-for-life",
  title: "12 Rules for Life",
  kind: "read",
  status: "not-started",
  author: "Jordan B. Peterson",
  unitSlug: "words",
  ownLength: 235050,
} as const satisfies Book
