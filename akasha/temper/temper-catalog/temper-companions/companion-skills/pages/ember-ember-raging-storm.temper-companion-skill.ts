import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const emberEmberRagingStorm = {
  id: "01a05fd0-1d7b-7f94-92b8-7e592f7d56e1",
  pageTypeSlug: "temper-companion-skill",
  slug: "ember-ember-raging-storm",
  key: "ember-raging-storm",
  title: "Raging Storm",
  icon: "/esoui/art/icons/ability_companion_sorcerer_ragingstorm.dds",
  description:
    "Your Companion creates a thunderstorm that follows the target, striking all enemies within for $1 Shock Damage every 1 second for 8 seconds. The final strike deals 300% additional damage to enemies under 25% Health.",
  companionId: "ember",
  abilityId: 164191,
  skillLineId: "companion-ember",
  skillType: "ultimate",
  validRoles: ["dps"],
} as const satisfies TemperCompanionSkill
