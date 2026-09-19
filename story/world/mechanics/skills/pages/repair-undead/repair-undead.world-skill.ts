import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const repairUndead = {
  id: "01a0657d-02b0-7ccd-99bd-8a5232037c5a",
  type: "page-type/world-skill",
  slug: "repair-undead",
  title: "Repair Undead",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
