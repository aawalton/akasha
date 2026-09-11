import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const depthCaptainOfMisfits = {
  id: "01a0657e-1352-7f09-9f62-64766b3e404d",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "depth-captain-of-misfits",
  title: "Depth Captain of Misfits",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["depth-rogue"],
  references: "jsonl",
} as const satisfies WorldClass
