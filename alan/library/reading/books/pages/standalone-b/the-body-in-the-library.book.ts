import type { Book } from "../../book.page-type.ts"

export const theBodyInTheLibrary = {
  id: "019db533-f399-7cb5-9a01-9ff320b5c7f6",
  pageTypeSlug: "book",
  slug: "the-body-in-the-library",
  title: "The Body in the Library",
  kind: "read",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 3,
} as const satisfies Book
