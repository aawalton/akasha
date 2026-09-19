import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const siphonLuck = {
  id: "01a0657d-02c5-7970-952f-a54fe8212e5d",
  type: "page-type/world-skill",
  slug: "siphon-luck",
  title: "Siphon Luck",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
