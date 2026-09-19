import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const dribbler = {
  id: "01a0657e-1357-7642-9b63-925c6eff301c",
  type: "page-type/world-class",
  slug: "dribbler",
  title: "Dribbler",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
