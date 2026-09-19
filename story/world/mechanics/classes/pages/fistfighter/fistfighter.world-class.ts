import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fistfighter = {
  id: "01a0657e-01dd-72c7-a64c-e890b179879a",
  type: "page-type/world-class",
  slug: "fistfighter",
  title: "Fistfighter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
