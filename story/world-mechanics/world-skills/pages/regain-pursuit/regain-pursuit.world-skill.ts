import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const regainPursuit = {
  id: "01a0657d-02a6-7831-932d-c06b4a118c03",
  type: "world-skill",
  slug: "regain-pursuit",
  title: "Regain Pursuit",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
