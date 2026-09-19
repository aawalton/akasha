import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const immunityMentalAlteration = {
  id: "01a06575-981d-7f01-a42c-3ef1fddc4038",
  type: "page-type/world-skill",
  slug: "immunity-mental-alteration",
  title: "Immunity: Mental Alteration",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
