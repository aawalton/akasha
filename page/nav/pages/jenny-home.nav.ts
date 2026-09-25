import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const jennyHome = {
  id: "01a0d922-a618-7754-8d32-1f8731afab06",
  type: "page-type/nav",
  slug: "jenny-home",
  title: "Home",
  icon: "house",
  navPlace: 0,
  app: "web-app/smilingjenny-web",
  navHref: "/",
} as const satisfies Nav
