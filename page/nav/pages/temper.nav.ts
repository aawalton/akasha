import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const temper = {
  id: "01a0d8fd-ef83-77fe-9089-703ae16cc844",
  type: "page-type/nav",
  slug: "temper",
  title: "Temper",
  icon: "Hammer",
  navPlace: 5,
  app: "web-app/alanwalton-web",
  navParent: "nav/products",
  navHref: "https://tempereso.com",
} as const satisfies Nav
