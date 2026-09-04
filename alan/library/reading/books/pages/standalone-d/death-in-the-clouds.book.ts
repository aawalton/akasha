import type { Book } from "../../book.page-type.ts"

export const deathInTheClouds = {
  id: "019db533-f399-7c8a-864c-bf61a4d21755",
  pageTypeSlug: "book",
  slug: "death-in-the-clouds",
  title: "Death in the Clouds",
  kind: "read",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 11,
} as const satisfies Book
