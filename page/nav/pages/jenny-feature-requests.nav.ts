import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const jennyFeatureRequests = {
  id: "01a0d922-a617-7cba-83f4-8bee8c9304e8",
  type: "page-type/nav",
  slug: "jenny-feature-requests",
  title: "Feature requests",
  icon: "message-square-plus",
  navPlace: 1,
  app: "web-app/smilingjenny-web",
  navHref: "/requests",
} as const satisfies Nav
