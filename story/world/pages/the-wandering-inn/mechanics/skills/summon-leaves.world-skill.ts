import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const summonLeaves = {
  id: "01a0657d-02fe-7f87-99b4-9ba9dc62262b",
  type: "page-type/world-skill",
  slug: "summon-leaves",
  title: "Summon Leaves",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
