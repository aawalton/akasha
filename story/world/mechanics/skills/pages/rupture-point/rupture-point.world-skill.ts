import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rupturePoint = {
  id: "01a0657d-02b7-70df-a9df-0c84e21db23d",
  type: "page-type/world-skill",
  slug: "rupture-point",
  title: "Rupture Point",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
