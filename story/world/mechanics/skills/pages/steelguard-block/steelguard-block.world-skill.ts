import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const steelguardBlock = {
  id: "01a0657d-02fa-7d44-8ba3-fcebd2dff4a4",
  type: "page-type/world-skill",
  slug: "steelguard-block",
  title: "Steelguard Block",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
