import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const temperDungeons = {
  id: "01a06577-2613-701a-80e7-801c65170eab",
  type: "page-type/nav",
  slug: "temper-dungeons",
  title: "Dungeons",
  icon: "file-text",
  navPlace: 2,
  app: "web-app/temper-web",
} as const satisfies Nav
