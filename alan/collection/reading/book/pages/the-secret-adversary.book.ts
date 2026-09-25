import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theSecretAdversary = {
  id: "019db533-f399-7bca-a32e-daee19594fe0",
  type: "page-type/book",
  slug: "the-secret-adversary",
  title: "The Secret Adversary",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 1,
} as const satisfies Book
