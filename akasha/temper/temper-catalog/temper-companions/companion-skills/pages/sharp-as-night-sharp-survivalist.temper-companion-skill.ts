import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const sharpAsNightSharpSurvivalist = {
  id: "01a05fd0-1d84-7a84-96f2-91969d7d22f6",
  pageTypeSlug: "temper-companion-skill",
  slug: "sharp-as-night-sharp-survivalist",
  key: "sharp-survivalist",
  title: "Survivalist",
  icon: "/esoui/art/icons/ability_companion_warden_passive.dds",
  description: "Increases Physical and Spell Resistance by 3% and healing done by 3%.",
  companionId: "sharp-as-night",
  abilityId: 193973,
  skillLineId: "companion-sharp-as-night",
  skillType: "passive",
} as const satisfies TemperCompanionSkill
