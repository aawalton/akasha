import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldSongs = {
  id: "01a0d926-50f0-7c33-8979-3bad16904be9",
  type: "page-type/nav",
  slug: "innworld-songs",
  title: "Songs",
  icon: "music",
  navPlace: 2,
  app: "web-app/innworld-web",
  navParent: "nav/innworld-powers",
  navHref: "/world-song",
} as const satisfies Nav
