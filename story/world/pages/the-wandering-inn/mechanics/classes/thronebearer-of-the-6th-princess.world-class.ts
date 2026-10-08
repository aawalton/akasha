import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const thronebearerOfThe6thPrincess = {
  id: "01a06586-0a67-7098-9605-d0e7a1fe34a3",
  type: "page-type/world-class",
  slug: "thronebearer-of-the-6th-princess",
  title: "Thronebearer of the 6th Princess",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/thronebearer-of-wards"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.439Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
