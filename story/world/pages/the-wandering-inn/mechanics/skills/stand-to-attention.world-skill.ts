import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const standToAttention = {
  id: "01a0657d-02ee-722e-9309-64abb0bd2014",
  type: "page-type/world-skill",
  slug: "stand-to-attention",
  title: "Stand to Attention",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
