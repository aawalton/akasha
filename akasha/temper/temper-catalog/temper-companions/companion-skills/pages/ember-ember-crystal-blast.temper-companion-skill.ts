import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const emberEmberCrystalBlast = {
  id: "01a05fd0-1d7a-7bd9-b60e-e5f06b1f6cd6",
  pageTypeSlug: "temper-companion-skill",
  slug: "ember-ember-crystal-blast",
  key: "ember-crystal-blast",
  title: "Crystal Blast",
  icon: "/esoui/art/icons/ability_companion_sorcerer_thunderclap.dds",
  description:
    "Your Companion conjures dark crystals to bombard an enemy, dealing $1 Magic Damage.",
  companionId: "ember",
  abilityId: 164289,
  skillLineId: "companion-ember-lightning-caller",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
