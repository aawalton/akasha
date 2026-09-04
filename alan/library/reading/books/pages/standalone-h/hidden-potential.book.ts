import type { Book } from "../../book.page-type.ts"

export const hiddenPotential = {
  id: "019db533-f39e-722d-b1a9-b056924a0864",
  pageTypeSlug: "book",
  slug: "hidden-potential",
  title: "Hidden Potential",
  status: "not-started",
  author: "Adam Grant",
  unitSlug: "words",
  ownLength: 110250,
} as const satisfies Book
