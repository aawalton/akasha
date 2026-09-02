import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const emberEmberTrickstersTrap = {
  id: "01a05fd0-1d7c-7dc2-a5a6-1c06916c284a",
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
