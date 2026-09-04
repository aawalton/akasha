import type { Book } from "../../book.page-type.ts"

export const dumbWitness = {
  id: "019db533-f399-7ca0-a231-0181c220bc81",
  pageTypeSlug: "book",
  slug: "dumb-witness",
  title: "Dumb Witness",
  kind: "read",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 14,
} as const satisfies Book
