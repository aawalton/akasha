import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const reviews = {
  id: "01a0ded0-0e7f-7685-b1dc-80478856ec21",
  type: "page-type/nav",
  slug: "reviews",
  title: "Review",
  icon: "ListChecks",
  navPlace: 3,
  app: "web-app/alanwalton-web",
} as const satisfies Nav
