import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const unitLuckyDodge = {
  id: "01a0657d-031f-7236-b045-ea5558433343",
  type: "world-skill",
  slug: "unit-lucky-dodge",
  title: "Unit: Lucky Dodge",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
