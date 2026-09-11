import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const berryFarmer = {
  id: "01a0657e-01b7-73ce-a2c0-0005e3142a35",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "berry-farmer",
  title: "Berry Farmer",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
