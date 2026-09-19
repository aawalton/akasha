import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rhythmCombo = {
  id: "01a0657d-02b2-751b-82b0-83b70a0029a8",
  type: "page-type/world-skill",
  slug: "rhythm-combo",
  title: "Rhythm Combo",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
