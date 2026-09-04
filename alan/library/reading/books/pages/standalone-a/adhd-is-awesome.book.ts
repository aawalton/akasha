import type { Book } from "../../book.page-type.ts"

export const adhdIsAwesome = {
  id: "019db533-f39e-725c-8b02-17d186e3ea03",
  pageTypeSlug: "book",
  slug: "adhd-is-awesome",
  title: "ADHD Is Awesome",
  kind: "read",
  status: "not-started",
  author: "Penn Holderness, Kim Holderness",
  unitSlug: "words",
  ownLength: 132450,
} as const satisfies Book
