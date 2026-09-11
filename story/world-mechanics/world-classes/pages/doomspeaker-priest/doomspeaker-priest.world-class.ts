import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const doomspeakerPriest = {
  id: "01a0657e-1356-7e2e-b5df-cff8ab9834e7",
  type: "world-class",
  slug: "doomspeaker-priest",
  title: "Doomspeaker Priest",
  world: "the-wandering-inn",
  evolvesToSlugs: ["priest-of-wrath-and-sky"],
  references: "jsonl",
} as const satisfies WorldClass
