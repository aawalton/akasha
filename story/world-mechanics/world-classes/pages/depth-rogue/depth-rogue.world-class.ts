import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const depthRogue = {
  id: "01a0657e-1352-7fdb-a2b0-63c323b58ca4",
  type: "world-class",
  slug: "depth-rogue",
  title: "Depth Rogue",
  world: "the-wandering-inn",
  evolvesToSlugs: ["depth-captain-of-misfits"],
  references: "jsonl",
} as const satisfies WorldClass
