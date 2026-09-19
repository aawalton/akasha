import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const reinforcedWards = {
  id: "01a0657d-02af-7bd9-9f67-44517e457471",
  type: "page-type/world-skill",
  slug: "reinforced-wards",
  title: "Reinforced Wards",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
