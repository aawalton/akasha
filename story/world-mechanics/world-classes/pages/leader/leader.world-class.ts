import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const leader = {
  id: "01a0657e-138d-71d5-a5c5-c98581a1269a",
  type: "world-class",
  slug: "leader",
  title: "Leader",
  world: "the-wandering-inn",
  aliases: ["leaders"],
  evolvesToSlugs: ["chieftain"],
  references: "jsonl",
} as const satisfies WorldClass
