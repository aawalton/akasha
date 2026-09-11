import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const recallWeapon = {
  id: "01a0657d-02a5-7e10-96b2-f1d3a62af9ce",
  type: "world-skill",
  slug: "recall-weapon",
  title: "Recall Weapon",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
