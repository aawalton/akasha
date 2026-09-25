import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldTheWanderingInn = {
  id: "01a0d926-50f0-71e9-9f0a-426af525fc93",
  type: "page-type/nav",
  slug: "innworld-the-wandering-inn",
  title: "The Wandering Inn",
  icon: "book-open",
  navPlace: 5,
  app: "web-app/innworld-web",
  navParent: "nav/innworld-world",
  navHref: "/world",
} as const satisfies Nav
