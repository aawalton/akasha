import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const azandarAzandarSonOfKozanset = {
  id: "019e6484-383e-7b59-9075-b41bb85d9916",
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
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
