import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const veteranSoldier = {
  id: "01a06586-0a6f-7118-b3c6-2e9a1b4f2276",
  type: "world-class",
  slug: "veteran-soldier",
  title: "Veteran Soldier",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
