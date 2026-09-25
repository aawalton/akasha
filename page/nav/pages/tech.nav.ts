import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const tech = {
  id: "01a0d8fd-ef83-7337-b0b4-eaa0b32f57db",
  type: "page-type/nav",
  slug: "tech",
  title: "Tech",
  icon: "ExternalLink",
  navPlace: 3,
  app: "web-app/alanwalton-web",
  bottomSection: true,
} as const satisfies Nav
