import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sneakAttack = {
  id: "01a0657d-02c7-72ca-a95e-b19c16d2709f",
  type: "page-type/world-skill",
  slug: "sneak-attack",
  title: "Sneak Attack",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.663Z",
  updatedAt: "2026-09-22T13:33:26.000Z",
} as const satisfies WorldSkill
