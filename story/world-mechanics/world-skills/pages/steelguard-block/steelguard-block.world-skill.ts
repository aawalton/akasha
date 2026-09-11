import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const steelguardBlock = {
  id: "01a0657d-02fa-7d44-8ba3-fcebd2dff4a4",
  type: "world-skill",
  slug: "steelguard-block",
  title: "Steelguard Block",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
