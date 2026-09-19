import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const coachmen = {
  id: "01a0657e-134b-7d4b-97ed-52d40820fe33",
  type: "page-type/world-class",
  slug: "coachmen",
  title: "Coachmen",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
