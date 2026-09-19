import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const waterRetainingSoil = {
  id: "01a0657d-032c-7e54-81a0-fbe493a7823d",
  type: "page-type/world-skill",
  slug: "water-retaining-soil",
  title: "Water-Retaining Soil",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
