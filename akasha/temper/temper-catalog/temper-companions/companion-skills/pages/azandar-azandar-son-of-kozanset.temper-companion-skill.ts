import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const azandarAzandarSonOfKozanset = {
  id: "01a05fd0-1d76-72a4-88c2-f2e74c5923c8",
  pageTypeSlug: "temper-companion-skill",
  slug: "azandar-azandar-son-of-kozanset",
  key: "azandar-son-of-kozanset",
  title: "Son of Kozanset",
  icon: "/esoui/art/icons/ability_companion_arcanist_passive.dds",
  description: "Increases Max Health by 3% and decreases ability cooldowns by 3%.",
  companionId: "azandar",
  abilityId: 193971,
  skillLineId: "companion-azandar",
  skillType: "passive",
} as const satisfies TemperCompanionSkill
