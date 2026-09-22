import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const emberEmberThunderousStrike = {
  id: "019e6484-3866-7ff6-bea6-33eef2107573",
  type: "page-type/temper-companion-skill",
  slug: "ember-ember-thunderous-strike",
  key: "ember-thunderous-strike",
  title: "Thunderous Strike",
  icon: "/esoui/art/icons/ability_companion_sorcerer_mage_fury.dds",
  description:
    "Your Companion calls down an explosion of lightning to finish off an enemy, dealing $1 Shock Damage and an additional $2 Shock Damage to other nearby enemies.",
  companionId: "temper-eso-companion/ember",
  abilityId: 164291,
  skillLineId: "companion-ember-lightning-caller",
  skillType: "temper-skill-type/active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
