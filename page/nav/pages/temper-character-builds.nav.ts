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
} as const satisfies Nav
