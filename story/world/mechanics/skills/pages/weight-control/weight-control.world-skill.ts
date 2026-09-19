import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const weightControl = {
  id: "01a0657d-032d-7810-abeb-172f0ac7a6ad",
  type: "page-type/world-skill",
  slug: "weight-control",
  title: "Weight Control",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
