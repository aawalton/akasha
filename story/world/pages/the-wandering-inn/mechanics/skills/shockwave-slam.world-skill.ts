import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shockwaveSlam = {
  id: "01a0657d-02c1-73bb-8a0f-35e6ed241080",
  type: "page-type/world-skill",
  slug: "shockwave-slam",
  title: "Shockwave Slam",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
