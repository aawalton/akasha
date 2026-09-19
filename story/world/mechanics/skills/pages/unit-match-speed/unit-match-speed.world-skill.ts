import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const unitMatchSpeed = {
  id: "01a0657d-031f-7ce5-8138-4a3564fb422c",
  type: "page-type/world-skill",
  slug: "unit-match-speed",
  title: "Unit: Match Speed",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
