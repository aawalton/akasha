import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const albums = {
  id: "01a0e95e-5b52-77c6-b215-9423dbb46b60",
  type: "page-type/nav",
  slug: "albums",
  title: "Albums",
  icon: "BookImage",
  navPlace: 0,
  app: "web-app/alanwalton-web",
} as const satisfies Nav
