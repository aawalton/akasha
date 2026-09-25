import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const designSystem = {
  id: "01a0d8fd-ef83-7db9-82db-4d780c031a8f",
  type: "page-type/nav",
  slug: "design-system",
  title: "Design System",
  icon: "SwatchBook",
  navPlace: 2,
  app: "web-app/alanwalton-web",
  navParent: "nav/content",
  navHref: "/design",
} as const satisfies Nav
