import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const cureMundaneWounds = {
  id: "01a06575-97ff-7afe-9cf1-d37e4ae329a7",
  type: "world-skill",
  slug: "cure-mundane-wounds",
  title: "Cure Mundane Wounds",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
