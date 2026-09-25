import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldLegacies = {
  id: "01a0d926-50ef-7f79-a64c-fd8a5cbfd6ba",
  type: "page-type/nav",
  slug: "innworld-legacies",
  title: "Legacies",
  icon: "dna",
  navPlace: 3,
  app: "web-app/innworld-web",
  navParent: "nav/innworld-powers",
  navHref: "/world-legacy",
} as const satisfies Nav
