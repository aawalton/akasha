import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const temperResources = {
  id: "01a0d910-e122-78e9-9869-d1a67f06979d",
  type: "page-type/nav",
  slug: "temper-resources",
  title: "Resources",
  icon: "book-open",
  navPlace: 1,
  app: "web-app/temper-web",
  bottomSection: true,
} as const satisfies Nav
