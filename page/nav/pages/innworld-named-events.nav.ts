import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldNamedEvents = {
  id: "01a0d926-50ef-7bd2-94ec-63441c926ac7",
  type: "page-type/nav",
  slug: "innworld-named-events",
  title: "Named Events",
  icon: "calendar-clock",
  navPlace: 1,
  app: "web-app/innworld-web",
  navParent: "nav/innworld-world",
  navHref: "/named-event",
} as const satisfies Nav
