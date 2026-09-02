import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const emberEmberEntomb = {
  id: "01a05fd0-1d7a-77d7-a256-4885e27eac02",
  pageTypeSlug: "temper-companion-skill",
  slug: "ember-ember-entomb",
  key: "ember-entomb",
  title: "Entomb",
  icon: "/esoui/art/icons/ability_companion_sorcerer_cyclone.dds",
  description:
    "Your Companion uses binding magic to immobilize enemies in front of them for $$1 seconds and heal themselves for $1 Health over $$2 seconds.",
  companionId: "ember",
  abilityId: 165871,
  skillLineId: "companion-ember-mischievous-caster",
  skillType: "active",
  validRoles: ["tank"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
