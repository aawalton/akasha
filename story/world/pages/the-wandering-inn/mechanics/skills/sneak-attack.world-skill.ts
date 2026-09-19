import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sneakAttack = {
  id: "01a0657d-02c7-72ca-a95e-b19c16d2709f",
  type: "page-type/world-skill",
  slug: "sneak-attack",
  title: "Sneak Attack",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
