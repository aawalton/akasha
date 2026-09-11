import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const thronebearerOfThe6thPrincess = {
  id: "01a06586-0a67-7098-9605-d0e7a1fe34a3",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "thronebearer-of-the-6th-princess",
  title: "Thronebearer of the 6th Princess",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["thronebearer-of-wards"],
  references: "jsonl",
} as const satisfies WorldClass
