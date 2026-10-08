import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const azandarAzandarSonOfKozanset = {
  id: "019e6484-383e-7b59-9075-b41bb85d9916",
  type: "page-type/temper-companion-skill",
  slug: "azandar-azandar-son-of-kozanset",
  key: "azandar-son-of-kozanset",
  title: "Son of Kozanset",
  icon: "/esoui/art/icons/ability_companion_arcanist_passive.dds",
  description: "Increases Max Health by 3% and decreases ability cooldowns by 3%.",
  companionId: "temper-eso-companion/azandar",
  abilityId: 193971,
  skillLineId: "temper-companion-skill-line/companion-azandar",
  skillType: "temper-skill-type/passive",
  skillEffects: "jsonl",
  createdAt: "2026-05-26T13:40:47.294Z",
  updatedAt: "2026-09-22T20:39:10.000Z",
} as const satisfies TemperCompanionSkill
