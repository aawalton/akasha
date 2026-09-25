import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const atlasHome = {
  id: "01a0d90c-9270-76e1-a9ab-1cda889b7433",
  type: "page-type/nav",
  slug: "atlas-home",
  title: "Home",
  icon: "house",
  navPlace: 0,
  app: "web-app/alanwalton-atlas-web",
  navHref: "/",
} as const satisfies Nav
