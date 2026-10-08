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
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
