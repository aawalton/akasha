import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const switchbladeWarrior = {
  id: "01a06586-0a60-7c4b-bef0-cdf0b964a5ec",
  type: "page-type/world-class",
  slug: "switchblade-warrior",
  title: "Switchblade Warrior",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
