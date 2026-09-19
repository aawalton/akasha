import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const weaponExperts = {
  id: "01a06586-0a75-767c-983d-c98f66b85bf4",
  type: "page-type/world-class",
  slug: "weapon-experts",
  title: "Weapon Experts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
