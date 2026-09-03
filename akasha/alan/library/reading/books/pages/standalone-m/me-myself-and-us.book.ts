import type { Book } from "../../book.page-type.ts"

export const meMyselfAndUs = {
  id: "019db533-f39e-7041-a97b-9144cda89878",
  pageTypeSlug: "book",
  slug: "me-myself-and-us",
  title: "Me, Myself, and Us",
  kind: "read",
  status: "not-started",
  author: "Brian R. Little Ph.D.",
  unitSlug: "words",
  ownLength: 132000,
} as const satisfies Book
