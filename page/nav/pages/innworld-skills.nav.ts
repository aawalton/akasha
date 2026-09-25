import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldSkills = {
  id: "01a0d926-50f0-75fc-8b7c-dc529e4be520",
  type: "page-type/nav",
  slug: "innworld-skills",
  title: "Skills",
  icon: "sparkles",
  navPlace: 3,
  app: "web-app/innworld-web",
  navHref: "/world-skill",
} as const satisfies Nav
