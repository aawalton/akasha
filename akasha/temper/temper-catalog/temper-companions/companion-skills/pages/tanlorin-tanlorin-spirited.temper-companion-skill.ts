import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const tanlorinTanlorinSpirited = {
  id: "01a05fd0-1d86-75f2-931b-464e93f8ae92",
  pageTypeSlug: "temper-companion-skill",
  slug: "tanlorin-tanlorin-spirited",
  key: "tanlorin-spirited",
  title: "Spirited",
  icon: "/esoui/art/icons/ability_companion_tanlorin_passive.dds",
  description: "Decreases damage taken by 3% and increases damage done by 3%.",
  companionId: "tanlorin",
  abilityId: 214685,
  skillLineId: "companion-tanlorin",
  skillType: "passive",
} as const satisfies TemperCompanionSkill
