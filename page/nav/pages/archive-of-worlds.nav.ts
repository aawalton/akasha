import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const archiveOfWorlds = {
  id: "01a0d8fd-ef82-7b2f-b208-92e255ba619f",
  type: "page-type/nav",
  slug: "archive-of-worlds",
  title: "Archive of Worlds",
  icon: "Globe",
  navPlace: 1,
  app: "web-app/alanwalton-web",
  navParent: "nav/products",
  navHref: "https://archiveofworlds.app",
  createdAt: "2026-09-25T14:35:15.714Z",
  updatedAt: "2026-09-26T16:20:47.000Z",
} as const satisfies Nav
