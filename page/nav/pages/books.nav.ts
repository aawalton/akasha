import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const books = {
  id: "01a06577-2613-7005-99b8-cfd9e21ea68b",
  type: "page-type/nav",
  slug: "books",
  title: "Books",
  icon: "book-open",
  navPlace: 0,
  app: "web-app/archive-of-worlds-web",
} as const satisfies Nav
