import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const temperGetStarted = {
  id: "01a0d910-e122-7382-be26-9b608a746659",
  type: "page-type/nav",
  slug: "temper-get-started",
  title: "Get Started",
  icon: "rocket",
  navPlace: 2,
  app: "web-app/temper-web",
  navHref: "/watcher",
} as const satisfies Nav
