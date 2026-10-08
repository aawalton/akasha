import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const temperCatalog = {
  id: "01a0d910-e121-7700-820b-44fcb227acf3",
  type: "page-type/nav",
  slug: "temper-catalog",
  title: "Catalog",
  icon: "library",
  navPlace: 8,
  app: "web-app/temper-web",
  navHref: "/catalog",
  createdAt: "2026-09-25T14:55:57.217Z",
  updatedAt: "2026-09-25T14:56:19.000Z",
} as const satisfies Nav
