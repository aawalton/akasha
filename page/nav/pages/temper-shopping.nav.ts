import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const temperShopping = {
  id: "01a0d910-e122-77a7-8fb0-c45fdc2fb739",
  type: "page-type/nav",
  slug: "temper-shopping",
  title: "Shopping",
  icon: "shopping-cart",
  navPlace: 7,
  app: "web-app/temper-web",
  navHref: "/shopping",
} as const satisfies Nav
