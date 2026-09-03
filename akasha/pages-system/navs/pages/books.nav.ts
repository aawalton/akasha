import type { Nav } from "../nav.page-type.ts"

export const books = {
  id: "01a06577-2613-7005-99b8-cfd9e21ea68b",
  pageTypeSlug: "nav",
  slug: "books",
  title: "Books",
  icon: "book-open",
  navPlace: 0,
  appSlug: "archive-of-worlds",
} as const satisfies Nav
