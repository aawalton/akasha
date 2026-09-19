import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const perfectPosture = {
  id: "01a0657d-028f-75b7-9907-690fd368d3da",
  type: "page-type/world-skill",
  slug: "perfect-posture",
  title: "Perfect Posture",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
