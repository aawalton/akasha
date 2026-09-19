import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const speedStitching = {
  id: "01a0657d-02ed-724f-80c4-eb479229c410",
  type: "page-type/world-skill",
  slug: "speed-stitching",
  title: "Speed Stitching",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
