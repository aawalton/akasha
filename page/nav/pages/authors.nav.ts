import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const authors = {
  id: "01a06577-2613-7004-a7f1-a996eef77421",
  type: "page-type/nav",
  slug: "authors",
  title: "Authors",
  icon: "users",
  navPlace: 1,
  app: "web-app/archive-of-worlds-web",
} as const satisfies Nav
