import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldCarriedMemories = {
  id: "01a0d926-50ef-71a9-b0f6-acbcc3172564",
  type: "page-type/nav",
  slug: "innworld-carried-memories",
  title: "Carried Memories",
  icon: "brain",
  navPlace: 5,
  app: "web-app/innworld-web",
  navParent: "nav/innworld-powers",
  navHref: "/world-carried-memory",
} as const satisfies Nav
