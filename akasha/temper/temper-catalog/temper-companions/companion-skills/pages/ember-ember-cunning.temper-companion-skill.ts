import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const emberEmberCunning = {
  id: "01a05fd0-1d7a-72fd-844a-da95be77b979",
  pageTypeSlug: "temper-companion-skill",
  slug: "ember-ember-cunning",
  key: "ember-cunning",
  title: "Enchanted",
  icon: "/esoui/art/icons/ability_companion_sorcerer_enchanted.dds",
  description: "Increases Critical Chance by 3% and damage done by 3%.",
  companionId: "ember",
  abilityId: 169465,
  skillLineId: "companion-ember",
  skillType: "passive",
  validRoles: ["dps"],
} as const satisfies TemperCompanionSkill
