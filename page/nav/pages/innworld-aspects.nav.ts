import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldAspects = {
  id: "01a0d926-50ee-78f1-9600-2fced57e2f63",
  type: "page-type/nav",
  slug: "innworld-aspects",
  title: "Aspects",
  icon: "gem",
  navPlace: 5,
  app: "web-app/innworld-web",
  navParent: "nav/innworld-marks",
  navHref: "/world-aspect",
} as const satisfies Nav
