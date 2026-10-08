import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldQuests = {
  id: "01a0d926-50f0-743d-8140-10bf459d7825",
  type: "page-type/nav",
  slug: "innworld-quests",
  title: "Quests",
  icon: "scroll",
  navPlace: 2,
  app: "web-app/innworld-web",
  navParent: "nav/innworld-world",
  createdAt: "2026-09-25T15:19:22.096Z",
  updatedAt: "2026-09-28T22:23:02.000Z",
} as const satisfies Nav
