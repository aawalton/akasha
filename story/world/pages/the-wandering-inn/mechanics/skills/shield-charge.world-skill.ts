import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shieldCharge = {
  id: "01a0657d-02c0-77f1-90d2-daffe73aeb29",
  type: "page-type/world-skill",
  slug: "shield-charge",
  title: "Shield Charge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
