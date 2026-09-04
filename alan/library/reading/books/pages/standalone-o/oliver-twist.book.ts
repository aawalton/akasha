import type { Book } from "../../book.page-type.ts"

export const oliverTwist = {
  id: "019db533-f39d-7aed-b5d0-95049b81760d",
  pageTypeSlug: "book",
  slug: "oliver-twist",
  title: "Oliver Twist",
  kind: "read",
  status: "not-started",
  author: "Charles Dickens",
  unitSlug: "words",
  position: 3,
  ownLength: 104500,
} as const satisfies Book
