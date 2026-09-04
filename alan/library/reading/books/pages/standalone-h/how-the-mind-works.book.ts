import type { Book } from "../../book.page-type.ts"

export const howTheMindWorks = {
  id: "019db533-f39e-7112-86ce-c9347ede9d4d",
  pageTypeSlug: "book",
  slug: "how-the-mind-works",
  title: "How the Mind Works",
  kind: "read",
  status: "completed",
  rank: "C",
  author: "Steven Pinker, Mel Foster, 3",
  unitSlug: "words",
  ownLength: 391200,
  ownProgress: 391200,
} as const satisfies Book
