import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const temperCharacters = {
  id: "01a06577-2613-7019-83c5-8561578d8de9",
  type: "page-type/nav",
  slug: "temper-characters",
  title: "Characters",
  icon: "swords",
  navPlace: 1,
  app: "web-app/temper-web",
} as const satisfies Nav
