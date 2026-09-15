import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const cavalryRider = {
  id: "01a0657e-1347-72ea-a9c9-cc2a3e8dc1bd",
  type: "world-class",
  slug: "cavalry-rider",
  title: "Cavalry Rider",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
