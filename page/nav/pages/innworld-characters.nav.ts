import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldCharacters = {
  id: "01a0d926-50ef-7efc-9380-4d65d167257b",
  type: "page-type/nav",
  slug: "innworld-characters",
  title: "Characters",
  icon: "users",
  navPlace: 1,
  app: "web-app/innworld-web",
  navHref: "/world-character",
} as const satisfies Nav
