import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const speedMelody = {
  id: "01a0657d-02ed-7622-8a98-1d3bf121a029",
  type: "page-type/world-skill",
  slug: "speed-melody",
  title: "Speed Melody",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
