import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shieldRam = {
  id: "01a0657d-02c0-77ff-80c5-63ca15701a1c",
  type: "page-type/world-skill",
  slug: "shield-ram",
  title: "Shield Ram",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
