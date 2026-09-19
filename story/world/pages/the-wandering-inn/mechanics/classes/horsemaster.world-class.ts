import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const horsemaster = {
  id: "01a0657e-1374-788b-a1aa-8cb38cb6ba75",
  type: "page-type/world-class",
  slug: "horsemaster",
  title: "Horsemaster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
