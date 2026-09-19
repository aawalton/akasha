import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const wolfRider = {
  id: "01a0657e-0272-73e9-8cc6-e14e4ed7caa0",
  type: "page-type/world-class",
  slug: "wolf-rider",
  title: "Wolf Rider",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
