import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const skillImpossibleDodge = {
  id: "01a0657d-02c6-7359-b516-4b7f1cc9503f",
  type: "page-type/world-skill",
  slug: "skill-impossible-dodge",
  title: "Skill – Impossible Dodge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
