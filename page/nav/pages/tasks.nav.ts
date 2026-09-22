import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const tasks = {
  id: "01a06577-2613-7018-84f7-f596a7242626",
  type: "page-type/nav",
  slug: "tasks",
  title: "Tasks",
  icon: "SquareCheckBig",
  navPlace: 12,
  app: "web-app/alanwalton-web",
  mobilePinOrder: 1,
} as const satisfies Nav
