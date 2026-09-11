import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const stealthArrow = {
  id: "01a0657d-02f9-7cd7-92e1-7e2c42a70b41",
  type: "world-skill",
  slug: "stealth-arrow",
  title: "Stealth Arrow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
