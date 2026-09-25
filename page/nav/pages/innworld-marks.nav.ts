import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldMarks = {
  id: "01a0d926-50ef-7338-8e14-0f8831682bf7",
  type: "page-type/nav",
  slug: "innworld-marks",
  title: "Marks",
  icon: "stamp",
  navPlace: 6,
  app: "web-app/innworld-web",
  bottomSection: true,
} as const satisfies Nav
