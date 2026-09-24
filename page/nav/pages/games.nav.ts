import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const games = {
  id: "01a0d443-f38f-791a-a03f-dbcba8b25f2b",
  type: "page-type/nav",
  slug: "games",
  title: "Games",
  icon: "Gamepad2",
  navPlace: 11,
  app: "web-app/alanwalton-web",
} as const satisfies Nav
