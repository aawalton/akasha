import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const massHealMinorWounds = {
  id: "01a0657d-024b-769a-bbbc-c807dba34bd3",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "mass-heal-minor-wounds",
  title: "Mass Heal Minor Wounds",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
