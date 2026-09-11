import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const horrorbaneAdventurer = {
  id: "01a0657e-01f9-76cf-9601-63f2791a38e9",
  type: "world-class",
  slug: "horrorbane-adventurer",
  title: "Horrorbane Adventurer",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["adventurer"],
  references: "jsonl",
} as const satisfies WorldClass
