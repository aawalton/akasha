import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shipBurstOfSpeed = {
  id: "01a0657d-02c0-7423-a3d3-19d758996f9c",
  type: "page-type/world-skill",
  slug: "ship-burst-of-speed",
  title: "Ship: Burst of Speed",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
