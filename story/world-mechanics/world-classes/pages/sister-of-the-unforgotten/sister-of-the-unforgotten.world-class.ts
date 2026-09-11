import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const sisterOfTheUnforgotten = {
  id: "01a06586-0a3e-7195-a59f-a1e880ac4cf5",
  type: "world-class",
  slug: "sister-of-the-unforgotten",
  title: "Sister of the Unforgotten",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["covert-wing-captain"],
  references: "jsonl",
} as const satisfies WorldClass
