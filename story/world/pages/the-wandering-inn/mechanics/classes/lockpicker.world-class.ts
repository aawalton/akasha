import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const lockpicker = {
  id: "01a0657e-021b-76a2-a328-dfec3bbfa307",
  type: "page-type/world-class",
  slug: "lockpicker",
  title: "Lockpicker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
