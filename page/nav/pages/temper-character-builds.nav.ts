import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const temperCharacterBuilds = {
  id: "01a0d910-e121-7fbf-8067-35bae9894177",
  type: "page-type/nav",
  slug: "temper-character-builds",
  title: "Character Builds",
  icon: "swords",
  navPlace: 3,
  app: "web-app/temper-web",
  navHref: "/character-build",
  mobilePinOrder: 2,
  createdAt: "2026-09-25T14:55:57.217Z",
  updatedAt: "2026-09-25T14:56:19.000Z",
} as const satisfies Nav
