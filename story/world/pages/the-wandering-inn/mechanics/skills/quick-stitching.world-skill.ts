import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quickStitching = {
  id: "01a0657d-029b-7076-9b19-614adc99e702",
  type: "page-type/world-skill",
  slug: "quick-stitching",
  title: "Quick Stitching",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
