import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const archmageSApprenticePrincess = {
  id: "01a0657e-01aa-7a1e-a1b7-8869b896c8e0",
  type: "page-type/world-class",
  slug: "archmage-s-apprentice-princess",
  title: "Archmage’s Apprentice-Princess",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["magic-loving-princess"],
  references: "jsonl",
} as const satisfies WorldClass
