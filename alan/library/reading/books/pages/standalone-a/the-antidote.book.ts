import type { Book } from "../../book.page-type.ts"

export const theAntidote = {
  id: "019db533-f39d-7fa7-92f8-53937235a01f",
  pageTypeSlug: "book",
  slug: "the-antidote",
  title: "The Antidote",
  kind: "read",
  status: "not-started",
  author: "Oliver Burkeman, Martín Rodríguez-Courel Ginzo",
  unitSlug: "words",
  ownLength: 93300,
} as const satisfies Book
