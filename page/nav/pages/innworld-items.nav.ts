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
  createdAt: "2026-09-25T15:19:22.095Z",
  updatedAt: "2026-09-28T22:23:02.000Z",
} as const satisfies Nav
