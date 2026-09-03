import type { Book } from "../../book.page-type.ts"

export const verbalJudoUpdatedEdition = {
  id: "019db533-f39d-7f35-b8de-e6a0e4495120",
  pageTypeSlug: "book",
  slug: "verbal-judo-updated-edition",
  title: "Verbal Judo, Updated Edition",
  kind: "read",
  status: "not-started",
  author: "Jerry B. Jenkins",
  unitSlug: "words",
  ownLength: 93000,
} as const satisfies Book
