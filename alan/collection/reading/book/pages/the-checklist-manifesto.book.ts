import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theChecklistManifesto = {
  id: "019db533-f39d-7e96-852e-18961bb77d31",
  type: "page-type/book",
  slug: "the-checklist-manifesto",
  title: "The Checklist Manifesto",
  status: "not-started",
  author: "Atul Gawande",
  unit: "unit/words",
  ownLength: 92250,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
