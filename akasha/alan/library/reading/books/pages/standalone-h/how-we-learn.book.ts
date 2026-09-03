import type { Book } from "../../book.page-type.ts"

export const howWeLearn = {
  id: "019db533-f39e-718e-a8a0-70ef884c1ea5",
  pageTypeSlug: "book",
  slug: "how-we-learn",
  title: "How We Learn",
  kind: "read",
  status: "not-started",
  author: "Benedict Carey",
  unitSlug: "words",
  ownLength: 175500,
} as const satisfies Book
