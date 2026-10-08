import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const portalGuardian = {
  id: "01a06586-0a0a-7b3d-ba57-96a0d5459c2e",
  type: "page-type/world-class",
  slug: "portal-guardian",
  title: "Portal Guardian",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  evolvesFromSlugs: ["world-class/doorgnoll"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.346Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
