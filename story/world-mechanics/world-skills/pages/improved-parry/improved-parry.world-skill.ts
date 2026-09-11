import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const improvedParry = {
  id: "01a06575-981e-74b9-b156-d439c83d5d38",
  type: "world-skill",
  slug: "improved-parry",
  title: "Improved Parry",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
