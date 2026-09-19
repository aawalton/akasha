import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const skillRoyalTaxLost = {
  id: "01a0657d-02c6-700e-b110-da5fba98e382",
  type: "page-type/world-skill",
  slug: "skill-royal-tax-lost",
  title: "Skill – Royal Tax lost.",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
