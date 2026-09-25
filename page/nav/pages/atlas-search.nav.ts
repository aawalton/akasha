import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const atlasSearch = {
  id: "01a0d90c-9270-737d-b614-af8bce98c462",
  type: "page-type/nav",
  slug: "atlas-search",
  title: "Search",
  icon: "search",
  navPlace: 1,
  app: "web-app/alanwalton-atlas-web",
  navHref: "/search",
} as const satisfies Nav
