import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldHome = {
  id: "01a0d926-50ef-7e8c-bae0-c7e948ca7212",
  type: "page-type/nav",
  slug: "innworld-home",
  title: "Home",
  icon: "house",
  navPlace: 0,
  app: "web-app/innworld-web",
  navHref: "/",
} as const satisfies Nav
