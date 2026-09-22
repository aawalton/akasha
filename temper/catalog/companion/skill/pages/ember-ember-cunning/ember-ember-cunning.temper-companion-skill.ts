import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const emberEmberCunning = {
  id: "019e6484-3859-79c2-8c47-1308c07b5fcd",
  type: "page-type/temper-companion-skill",
  slug: "ember-ember-cunning",
  key: "ember-cunning",
  title: "Enchanted",
  icon: "/esoui/art/icons/ability_companion_sorcerer_enchanted.dds",
  description: "Increases Critical Chance by 3% and damage done by 3%.",
  companionId: "temper-eso-companion/ember",
  abilityId: 169465,
  skillLineId: "temper-companion-skill-line/companion-ember",
  skillType: "temper-skill-type/passive",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
