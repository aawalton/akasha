import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const atlasMap = {
  id: "01a0d90c-9270-78d4-b084-fc71cfc663ff",
  type: "page-type/nav",
  slug: "atlas-map",
  title: "Map",
  icon: "map",
  navPlace: 2,
  app: "web-app/alanwalton-atlas-web",
  navHref: "/map",
} as const satisfies Nav
