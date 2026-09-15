import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const parryTheTyrant = {
  id: "01a0657d-0286-76e4-9834-a44937eab188",
  type: "world-skill",
  slug: "parry-the-tyrant",
  title: "Parry the Tyrant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
