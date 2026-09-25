import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const temperCompanionBuilds = {
  id: "01a0d910-e122-7a28-8a46-58f1be714791",
  type: "page-type/nav",
  slug: "temper-companion-builds",
  title: "Companion Builds",
  icon: "handshake",
  navPlace: 4,
  app: "web-app/temper-web",
  navHref: "/companion-build",
  mobilePinOrder: 3,
} as const satisfies Nav
