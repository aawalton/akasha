import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const templarOfTheSky = {
  id: "01a0657e-0269-77b7-beff-67fb0c13fe14",
  type: "page-type/world-class",
  slug: "templar-of-the-sky",
  title: "Templar of the Sky",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["templar-of-speech"],
  references: "jsonl",
} as const satisfies WorldClass
