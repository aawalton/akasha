import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const lastSurvivor = {
  id: "01a0657e-021a-7097-b3fd-f4b8619c2891",
  type: "page-type/world-class",
  slug: "last-survivor",
  title: "Last Survivor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
