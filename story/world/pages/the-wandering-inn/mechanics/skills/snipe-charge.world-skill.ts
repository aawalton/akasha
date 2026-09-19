import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const snipeCharge = {
  id: "01a0657d-02c7-77ef-a306-463483ad5fbb",
  type: "page-type/world-skill",
  slug: "snipe-charge",
  title: "Snipe Charge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
