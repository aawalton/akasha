import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldSpells = {
  id: "01a0d926-50f0-7d06-b88f-a3de470d656a",
  type: "page-type/nav",
  slug: "innworld-spells",
  title: "Spells",
  icon: "wand-sparkles",
  navPlace: 4,
  app: "web-app/innworld-web",
  navHref: "/world-spell",
} as const satisfies Nav
