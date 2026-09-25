import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldItems = {
  id: "01a0d926-50ef-7d43-8ca6-43ed37f56578",
  type: "page-type/nav",
  slug: "innworld-items",
  title: "Items",
  icon: "sword",
  navPlace: 1,
  app: "web-app/innworld-web",
  navParent: "nav/innworld-things",
  navHref: "/world-item",
} as const satisfies Nav
