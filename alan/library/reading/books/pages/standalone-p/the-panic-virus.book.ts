import type { Book } from "../../book.page-type.ts"

export const thePanicVirus = {
  id: "019db533-f39d-7e3f-972c-8da6451df00d",
  pageTypeSlug: "book",
  slug: "the-panic-virus",
  title: "The Panic Virus",
  status: "not-started",
  author: "Seth Mnookin",
  unitSlug: "words",
  ownLength: 160950,
} as const satisfies Book
