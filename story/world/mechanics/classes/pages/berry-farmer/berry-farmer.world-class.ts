import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const berryFarmer = {
  id: "01a0657e-01b7-73ce-a2c0-0005e3142a35",
  type: "page-type/world-class",
  slug: "berry-farmer",
  title: "Berry Farmer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
