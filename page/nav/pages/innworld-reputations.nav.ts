import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldReputations = {
  id: "01a0d926-50f0-7512-bf0c-094415909665",
  type: "page-type/nav",
  slug: "innworld-reputations",
  title: "Reputations",
  icon: "handshake",
  navPlace: 4,
  app: "web-app/innworld-web",
  navParent: "nav/innworld-marks",
  navHref: "/world-reputation",
} as const satisfies Nav
