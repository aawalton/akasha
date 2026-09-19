import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const speedRaid = {
  id: "01a0657d-02ed-7960-a4e7-82655ba1cf9e",
  type: "page-type/world-skill",
  slug: "speed-raid",
  title: "Speed Raid",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
