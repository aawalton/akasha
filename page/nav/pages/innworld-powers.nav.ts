import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldPowers = {
  id: "01a0d926-50ef-7360-9930-44b399b2f49b",
  type: "page-type/nav",
  slug: "innworld-powers",
  title: "Powers",
  icon: "flame",
  navPlace: 5,
  app: "web-app/innworld-web",
  bottomSection: true,
} as const satisfies Nav
