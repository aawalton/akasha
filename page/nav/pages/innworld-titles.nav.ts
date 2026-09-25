import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldTitles = {
  id: "01a0d926-50f0-711e-9009-40e872bec15d",
  type: "page-type/nav",
  slug: "innworld-titles",
  title: "Titles",
  icon: "award",
  navPlace: 2,
  app: "web-app/innworld-web",
  navParent: "nav/innworld-marks",
  navHref: "/world-title",
} as const satisfies Nav
