import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const recallWeapon = {
  id: "01a0657d-02a5-7e10-96b2-f1d3a62af9ce",
  type: "page-type/world-skill",
  slug: "recall-weapon",
  title: "Recall Weapon",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.629Z",
  updatedAt: "2026-09-22T13:33:09.000Z",
} as const satisfies WorldSkill
