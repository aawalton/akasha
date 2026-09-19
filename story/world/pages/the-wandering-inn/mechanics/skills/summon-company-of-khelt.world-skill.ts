import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const summonCompanyOfKhelt = {
  id: "01a0657d-02fe-7c71-9831-c461143b7a17",
  type: "page-type/world-skill",
  slug: "summon-company-of-khelt",
  title: "Summon: Company of Khelt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
