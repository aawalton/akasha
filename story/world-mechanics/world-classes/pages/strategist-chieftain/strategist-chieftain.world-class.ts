import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const strategistChieftain = {
  id: "01a06586-0a56-7679-acd1-83efbb32b5f1",
  type: "world-class",
  slug: "strategist-chieftain",
  title: "Strategist Chieftain",
  world: "the-wandering-inn",
  evolvesToSlugs: ["strategist-chieftain-of-reclamation"],
  references: "jsonl",
} as const satisfies WorldClass
