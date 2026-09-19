import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const weaponMaster = {
  id: "01a06586-0a75-7349-9cec-eb2b35e13c5a",
  type: "page-type/world-class",
  slug: "weapon-master",
  title: "Weapon Master",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
