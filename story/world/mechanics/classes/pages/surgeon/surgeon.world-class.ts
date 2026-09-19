import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const surgeon = {
  id: "01a06586-0a60-73b3-a2c5-31478a60f66f",
  type: "page-type/world-class",
  slug: "surgeon",
  title: "Surgeon",
  world: "world/the-wandering-inn",
  aliases: ["surgeons"],
  evolvesToSlugs: ["psychic-surgeon"],
  references: "jsonl",
} as const satisfies WorldClass
