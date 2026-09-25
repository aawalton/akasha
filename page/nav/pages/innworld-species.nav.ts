import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldSpecies = {
  id: "01a0d926-50f0-7b5c-b2ff-f0a865cf2373",
  type: "page-type/nav",
  slug: "innworld-species",
  title: "Species",
  icon: "paw-print",
  navPlace: 3,
  app: "web-app/innworld-web",
  navParent: "nav/innworld-world",
  navHref: "/world-species",
} as const satisfies Nav
