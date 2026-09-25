import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldWorld = {
  id: "01a0d926-50f0-7586-95c6-15fdfcd6e082",
  type: "page-type/nav",
  slug: "innworld-world",
  title: "World",
  icon: "globe",
  navPlace: 8,
  app: "web-app/innworld-web",
  bottomSection: true,
} as const satisfies Nav
