import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const archerCaptain = {
  id: "01a0657e-132d-7fe7-a7e0-2a9672238abf",
  type: "page-type/world-class",
  slug: "archer-captain",
  title: "Archer Captain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
