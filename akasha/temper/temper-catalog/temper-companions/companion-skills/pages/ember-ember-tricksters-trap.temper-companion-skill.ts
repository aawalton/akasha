import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const emberEmberTrickstersTrap = {
  id: "019e6484-3868-79e5-b7b4-335bf0e0efda",
  pageTypeSlug: "temper-companion-skill",
  slug: "ember-ember-tricksters-trap",
  key: "ember-tricksters-trap",
  title: "Trickster's Trap",
  icon: "/esoui/art/icons/ability_companion_sorcerer_dark_fog.dds",
  description: "Your Companion dazzles an enemy in a ball of magic, stunning them for $$1 seconds.",
  companionId: "ember",
  abilityId: 165865,
  skillLineId: "companion-ember-mischievous-caster",
  skillType: "active",
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
