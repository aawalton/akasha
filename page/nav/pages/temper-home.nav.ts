import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const temperHome = {
  id: "01a0d910-e122-75ee-837d-fa4ef096f932",
  type: "page-type/nav",
  slug: "temper-home",
  title: "Home",
  icon: "house",
  navPlace: 1,
  app: "web-app/temper-web",
  navHref: "/home",
  mobilePinOrder: 1,
  createdAt: "2026-09-25T14:55:57.218Z",
  updatedAt: "2026-09-25T14:56:19.000Z",
} as const satisfies Nav
