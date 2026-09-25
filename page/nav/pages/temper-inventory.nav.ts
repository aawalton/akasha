import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const temperInventory = {
  id: "01a0d910-e122-71c0-ab99-a51e1f8c86ae",
  type: "page-type/nav",
  slug: "temper-inventory",
  title: "Inventory",
  icon: "package",
  navPlace: 6,
  app: "web-app/temper-web",
  navHref: "/inventory",
} as const satisfies Nav
