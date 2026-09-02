import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allNoSkill = {
  id: "01a05fd0-1d69-7a2b-81fd-5e2781b03ff0",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-no-skill",
  key: "no-skill",
  title: "No Skill",
  description: "No skill selected",
  companionId: "all",
  abilityId: 0,
  skillLineId: "weapon-two-handed",
  skillType: "active",
} as const satisfies TemperCompanionSkill
