import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const explosiveVenting = {
  id: "01a06575-980a-7d06-bb99-14a220009da8",
  type: "page-type/world-skill",
  slug: "explosive-venting",
  title: "Explosive Venting",
  world: "world/the-wandering-inn",
} as const satisfies WorldSkill
