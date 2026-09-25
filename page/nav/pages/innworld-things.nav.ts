import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldThings = {
  id: "01a0d926-50f0-751b-bc24-022f2966a4c1",
  type: "page-type/nav",
  slug: "innworld-things",
  title: "Things",
  icon: "package",
  navPlace: 7,
  app: "web-app/innworld-web",
  bottomSection: true,
} as const satisfies Nav
