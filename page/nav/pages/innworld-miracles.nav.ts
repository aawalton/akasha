import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldMiracles = {
  id: "01a0d926-50ef-7725-9cfc-76c8449d7788",
  type: "page-type/nav",
  slug: "innworld-miracles",
  title: "Miracles",
  icon: "sun",
  navPlace: 1,
  app: "web-app/innworld-web",
  navParent: "nav/innworld-powers",
  navHref: "/world-miracle",
} as const satisfies Nav
