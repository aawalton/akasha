import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const climber = {
  id: "01a0657e-134a-715d-8a69-95710c3eff79",
  type: "page-type/world-class",
  slug: "climber",
  title: "Climber",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
