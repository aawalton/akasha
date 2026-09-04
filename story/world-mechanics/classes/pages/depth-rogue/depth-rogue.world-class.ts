import type { WorldClass } from "../../world-class.page-type.ts"

export const depthRogue = {
  id: "01a0657e-1352-7fdb-a2b0-63c323b58ca4",
  pageTypeSlug: "world-class",
  slug: "depth-rogue",
  title: "Depth Rogue",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["depth-captain-of-misfits"],
  references: "jsonl",
} as const satisfies WorldClass
