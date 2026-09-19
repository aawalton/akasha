import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const veteranSergeant = {
  id: "01a0657e-026e-7842-b450-5d3ae4dd6999",
  type: "page-type/world-class",
  slug: "veteran-sergeant",
  title: "Veteran Sergeant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
