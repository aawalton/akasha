import type { Book } from "../../book.page-type.ts"

export const theTalentCode = {
  id: "019db533-f39d-7de8-90ca-30973097b430",
  pageTypeSlug: "book",
  slug: "the-talent-code",
  title: "The Talent Code",
  status: "not-started",
  author: "Daniel Coyle",
  unitSlug: "words",
  ownLength: 91500,
} as const satisfies Book
