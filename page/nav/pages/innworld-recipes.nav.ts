import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldRecipes = {
  id: "01a0d926-50f0-72b5-a8e3-5bcce8deb6fb",
  type: "page-type/nav",
  slug: "innworld-recipes",
  title: "Recipes",
  icon: "chef-hat",
  navPlace: 3,
  app: "web-app/innworld-web",
  navParent: "nav/innworld-things",
  createdAt: "2026-09-25T15:19:22.096Z",
  updatedAt: "2026-09-28T22:23:02.000Z",
} as const satisfies Nav
