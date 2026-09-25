import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldBoons = {
  id: "01a0d926-50ee-7d99-a1cb-32521607824d",
  type: "page-type/nav",
  slug: "innworld-boons",
  title: "Boons",
  icon: "gift",
  navPlace: 4,
  app: "web-app/innworld-web",
  navParent: "nav/innworld-powers",
  navHref: "/world-boon",
} as const satisfies Nav
