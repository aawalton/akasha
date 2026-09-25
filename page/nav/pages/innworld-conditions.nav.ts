import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldConditions = {
  id: "01a0d926-50ef-7519-b62d-13d0ae3f294d",
  type: "page-type/nav",
  slug: "innworld-conditions",
  title: "Conditions",
  icon: "heart-pulse",
  navPlace: 1,
  app: "web-app/innworld-web",
  navParent: "nav/innworld-marks",
  navHref: "/world-condition",
} as const satisfies Nav
