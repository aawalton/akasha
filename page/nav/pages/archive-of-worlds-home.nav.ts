import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const archiveOfWorldsHome = {
  id: "01a0d90c-926f-7b05-86ca-b750cf472db9",
  type: "page-type/nav",
  slug: "archive-of-worlds-home",
  title: "Home",
  icon: "house",
  navPlace: -1,
  app: "web-app/archive-of-worlds-web",
  navHref: "/",
} as const satisfies Nav
