import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const content = {
  id: "01a0d8fd-ef83-7987-b1b4-505755628fae",
  type: "page-type/nav",
  slug: "content",
  title: "Content",
  icon: "FileText",
  navPlace: 2,
  app: "web-app/alanwalton-web",
  bottomSection: true,
} as const satisfies Nav
