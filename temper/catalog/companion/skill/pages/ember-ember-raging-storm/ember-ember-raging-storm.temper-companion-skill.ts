import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const emberEmberRagingStorm = {
  id: "019e6484-3860-7a92-9899-31056fbfecc6",
  type: "page-type/temper-companion-skill",
  slug: "ember-ember-raging-storm",
  key: "ember-raging-storm",
  title: "Raging Storm",
  icon: "/esoui/art/icons/ability_companion_sorcerer_ragingstorm.dds",
  description:
    "Your Companion creates a thunderstorm that follows the target, striking all enemies within for $1 Shock Damage every 1 second for 8 seconds. The final strike deals 300% additional damage to enemies under 25% Health.",
  companionId: "ember",
  abilityId: 164191,
  skillLineId: "companion-ember",
  skillType: "temper-skill-type/ultimate",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
