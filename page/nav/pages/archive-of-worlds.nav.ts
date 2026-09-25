import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const archiveOfWorlds = {
  id: "01a0d8fd-ef82-7b2f-b208-92e255ba619f",
  type: "page-type/nav",
  slug: "archive-of-worlds",
  title: "Archive of Worlds",
  icon: "Globe",
  navPlace: 2,
  app: "web-app/alanwalton-web",
  navParent: "nav/products",
  navHref: "https://archiveofworlds.app",
} as const satisfies Nav
