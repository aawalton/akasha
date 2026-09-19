import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const skillDetectPoisonLost = {
  id: "01a0657d-02c6-71be-b598-64c21387e5a8",
  type: "page-type/world-skill",
  slug: "skill-detect-poison-lost",
  title: "Skill – Detect Poison lost.",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
