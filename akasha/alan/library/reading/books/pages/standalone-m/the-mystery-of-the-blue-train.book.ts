import type { Book } from "../../book.page-type.ts"

export const theMysteryOfTheBlueTrain = {
  id: "019db533-f399-7cca-849d-a9788ede6e97",
  pageTypeSlug: "book",
  slug: "the-mystery-of-the-blue-train",
  title: "The Mystery of the Blue Train",
  kind: "read",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 6,
  ownLength: 79250,
} as const satisfies Book
