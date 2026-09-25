import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldReligions = {
  id: "01a0d926-50f0-7e8f-b4cc-dafb6175a7ea",
  type: "page-type/nav",
  slug: "innworld-religions",
  title: "Religions",
  icon: "church",
  navPlace: 4,
  app: "web-app/innworld-web",
  navParent: "nav/innworld-world",
  navHref: "/world-religion",
} as const satisfies Nav
