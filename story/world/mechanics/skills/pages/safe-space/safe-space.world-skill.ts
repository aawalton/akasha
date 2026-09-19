import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const safeSpace = {
  id: "01a0657d-02b7-7b33-bb4e-8669da5a6ac4",
  type: "page-type/world-skill",
  slug: "safe-space",
  title: "Safe Space",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
