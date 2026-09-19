import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const buggyWingCommander = {
  id: "01a0657e-01c0-7cf8-80f4-4a33e4ff43cd",
  type: "page-type/world-class",
  slug: "buggy-wing-commander",
  title: "Buggy Wing Commander",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
