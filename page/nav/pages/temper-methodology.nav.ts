import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const temperMethodology = {
  id: "01a0d910-e122-7229-bde7-923fb83c5072",
  type: "page-type/nav",
  slug: "temper-methodology",
  title: "Methodology",
  icon: "book-check",
  navPlace: 1,
  app: "web-app/temper-web",
  navParent: "nav/temper-resources",
  navHref: "/methodology",
} as const satisfies Nav
