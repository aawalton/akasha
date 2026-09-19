import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const farHunter = {
  id: "01a0657e-01da-7c59-bd2e-7d4f41262f2d",
  type: "page-type/world-class",
  slug: "far-hunter",
  title: "Far Hunter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
