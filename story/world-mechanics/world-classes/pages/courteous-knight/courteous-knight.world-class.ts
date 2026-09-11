import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const courteousKnight = {
  id: "01a0657e-134f-7dc4-aa0e-8c64dc5f413d",
  type: "world-class",
  slug: "courteous-knight",
  title: "Courteous Knight",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["courteous-mugger"],
  evolvesToSlugs: ["knight-of-honor-s-ember"],
  references: "jsonl",
} as const satisfies WorldClass
