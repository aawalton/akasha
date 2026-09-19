import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const honestReporter = {
  id: "01a0657e-01f9-73fa-a6dc-f54fb7717760",
  type: "page-type/world-class",
  slug: "honest-reporter",
  title: "Honest Reporter",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["gossip"],
  references: "jsonl",
} as const satisfies WorldClass
