import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const products = {
  id: "01a0d8fd-ef83-7b7d-927b-7e22a91729bf",
  type: "page-type/nav",
  slug: "products",
  title: "Products",
  icon: "Package",
  navPlace: 1,
  app: "web-app/alanwalton-web",
  bottomSection: true,
} as const satisfies Nav
