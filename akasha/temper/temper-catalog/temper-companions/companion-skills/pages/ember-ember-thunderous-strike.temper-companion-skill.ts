import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const emberEmberThunderousStrike = {
  id: "019e6484-3866-7ff6-bea6-33eef2107573",
  pageTypeSlug: "temper-companion-skill",
  slug: "ember-ember-thunderous-strike",
  key: "ember-thunderous-strike",
  title: "Thunderous Strike",
  icon: "/esoui/art/icons/ability_companion_sorcerer_mage_fury.dds",
  description:
    "Your Companion calls down an explosion of lightning to finish off an enemy, dealing $1 Shock Damage and an additional $2 Shock Damage to other nearby enemies.",
  companionId: "ember",
  abilityId: 164291,
  skillLineId: "companion-ember-lightning-caller",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
