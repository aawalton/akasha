import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const weaponMasters = {
  id: "01a0657e-0271-7912-be96-d8ac13413be2",
  type: "page-type/world-class",
  slug: "weapon-masters",
  title: "Weapon Masters",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
