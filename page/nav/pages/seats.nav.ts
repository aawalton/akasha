import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const seats = {
  id: "01a0d41a-6c55-76c6-9bcf-87ca8e97db92",
  type: "page-type/nav",
  slug: "seats",
  title: "Seats",
  icon: "Armchair",
  navPlace: 15,
  app: "web-app/alanwalton-web",
} as const satisfies Nav
