import type { Book } from "../../book.page-type.ts"

export const theChecklistManifesto = {
  id: "019db533-f39d-7e96-852e-18961bb77d31",
  pageTypeSlug: "book",
  slug: "the-checklist-manifesto",
  title: "The Checklist Manifesto",
  status: "not-started",
  author: "Atul Gawande",
  unitSlug: "words",
  ownLength: 92250,
} as const satisfies Book
