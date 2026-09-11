import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const braveSkirmisher = {
  id: "01a0657e-1340-7135-9b05-39d98054c81e",
  type: "world-class",
  slug: "brave-skirmisher",
  title: "Brave Skirmisher",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["skirmisher"],
  references: "jsonl",
} as const satisfies WorldClass
