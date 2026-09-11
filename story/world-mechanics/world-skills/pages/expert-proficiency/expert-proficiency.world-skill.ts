import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const expertProficiency = {
  id: "01a06575-980a-71b1-9419-db59b20c94c5",
  type: "world-skill",
  slug: "expert-proficiency",
  title: "Expert Proficiency",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
