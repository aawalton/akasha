import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const principles = {
  id: "01a0d8fd-ef83-7ee9-a23b-a3e4e8f8a7af",
  type: "page-type/nav",
  slug: "principles",
  title: "Principles",
  icon: "Compass",
  navPlace: 1,
  app: "web-app/alanwalton-web",
  navParent: "nav/content",
  navHref: "/principles",
} as const satisfies Nav
