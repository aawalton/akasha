import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const verbalJudoUpdatedEdition = {
  id: "019db533-f39d-7f35-b8de-e6a0e4495120",
  type: "page-type/book",
  slug: "verbal-judo-updated-edition",
  title: "Verbal Judo, Updated Edition",
  status: "not-started",
  author: "Jerry B. Jenkins",
  unit: "unit/words",
  ownLength: 93000,
} as const satisfies Book
