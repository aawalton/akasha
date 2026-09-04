import type { Book } from "../../book.page-type.ts"

export const theSecretAdversary = {
  id: "019db533-f399-7bca-a32e-daee19594fe0",
  pageTypeSlug: "book",
  slug: "the-secret-adversary",
  title: "The Secret Adversary",
  kind: "read",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 1,
} as const satisfies Book
