import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const allNoSkill = {
  id: "019e6451-1209-7d71-83b7-bfc64a8b5914",
  type: "page-type/temper-companion-skill",
  slug: "all-no-skill",
  key: "no-skill",
  title: "No Skill",
  description: "No skill selected",
  abilityId: 0,
  skillLineId: "temper-companion-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/active",
} as const satisfies TemperCompanionSkill
