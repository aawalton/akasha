import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const immunityVampirism = {
  id: "01a06575-981d-71b9-90f3-5b174aa9e971",
  type: "page-type/world-skill",
  slug: "immunity-vampirism",
  title: "Immunity: Vampirism",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
