import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const temperSettings = {
  id: "01a0d910-e122-7644-8748-cc5f41d4a480",
  type: "page-type/nav",
  slug: "temper-settings",
  title: "Settings",
  icon: "settings",
  navPlace: 2,
  app: "web-app/temper-web",
  navHref: "/settings",
  bottomSection: true,
} as const satisfies Nav
