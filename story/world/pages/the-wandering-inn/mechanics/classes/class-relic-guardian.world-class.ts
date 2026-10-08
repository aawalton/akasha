import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const classRelicGuardian = {
  id: "01a0658b-0668-7789-bc3a-318a684034ac",
  type: "page-type/world-class",
  slug: "class-relic-guardian",
  title: "Class – Relic Guardian",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["world-class/skeleton-knight"],
  createdAt: "2026-09-03T04:33:25.096Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
