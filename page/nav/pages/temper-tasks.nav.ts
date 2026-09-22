import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const temperTasks = {
  id: "01a06577-2613-701c-9a56-98ee3786d7a2",
  type: "page-type/nav",
  slug: "temper-tasks",
  title: "Temper Tasks",
  icon: "CalendarCheck",
  navPlace: 13,
  app: "web-app/alanwalton-web",
  mobilePinOrder: 2,
} as const satisfies Nav
