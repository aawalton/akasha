import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const recklessCharge = {
  id: "01a0657d-02a6-7790-911b-352f3d4b0fe6",
  type: "page-type/world-skill",
  slug: "reckless-charge",
  title: "Reckless Charge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
