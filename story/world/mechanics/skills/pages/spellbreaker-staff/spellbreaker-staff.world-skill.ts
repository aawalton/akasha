import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const spellbreakerStaff = {
  id: "01a0657d-02ed-76ad-b30c-69a8cfdae60f",
  type: "page-type/world-skill",
  slug: "spellbreaker-staff",
  title: "Spellbreaker Staff",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
