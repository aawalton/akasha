import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const myStunningPerformance = {
  id: "01a0657d-0270-72b2-be51-669d30e84397",
  type: "page-type/world-skill",
  slug: "my-stunning-performance",
  title: "My Stunning Performance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
