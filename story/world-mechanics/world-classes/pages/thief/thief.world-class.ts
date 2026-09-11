import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const thief = {
  id: "01a0657e-026b-7e13-8de2-05b87fa46dea",
  type: "world-class",
  slug: "thief",
  title: "Thief",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
