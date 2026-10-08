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
  createdAt: "2026-09-25T15:19:22.096Z",
  updatedAt: "2026-09-28T22:23:02.000Z",
} as const satisfies Nav
