import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const lancerOfTheAges = {
  id: "01a0657e-138c-7352-a133-68dbc7cb42cd",
  type: "world-class",
  slug: "lancer-of-the-ages",
  title: "Lancer of the Ages",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["peerless-lance"],
  references: "jsonl",
} as const satisfies WorldClass
