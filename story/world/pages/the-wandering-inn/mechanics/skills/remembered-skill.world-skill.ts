import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rememberedSkill = {
  id: "01a0657d-02b0-7b72-9d13-ce0068fc4aae",
  type: "page-type/world-skill",
  slug: "remembered-skill",
  title: "Remembered Skill",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
