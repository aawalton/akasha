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
  navHref: "/world-recipe",
} as const satisfies Nav
