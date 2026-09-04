import type { Book } from "../../book.page-type.ts"

export const sadCypress = {
  id: "019db533-f399-7c40-a1f2-ab312d9bfb74",
  pageTypeSlug: "book",
  slug: "sad-cypress",
  title: "Sad Cypress",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 18,
} as const satisfies Book
