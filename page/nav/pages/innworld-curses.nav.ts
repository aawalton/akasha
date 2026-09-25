import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldCurses = {
  id: "01a0d926-50ef-7b13-a838-a08ac808a002",
  type: "page-type/nav",
  slug: "innworld-curses",
  title: "Curses",
  icon: "skull",
  navPlace: 3,
  app: "web-app/innworld-web",
  navParent: "nav/innworld-marks",
  navHref: "/world-curse",
} as const satisfies Nav
