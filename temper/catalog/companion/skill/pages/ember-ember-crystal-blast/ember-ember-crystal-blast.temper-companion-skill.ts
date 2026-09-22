import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const emberEmberCrystalBlast = {
  id: "019e6484-3858-70a4-b668-839c1c23b5ae",
  type: "page-type/temper-companion-skill",
  slug: "ember-ember-crystal-blast",
  key: "ember-crystal-blast",
  title: "Crystal Blast",
  icon: "/esoui/art/icons/ability_companion_sorcerer_thunderclap.dds",
  description:
    "Your Companion conjures dark crystals to bombard an enemy, dealing $1 Magic Damage.",
  companionId: "temper-eso-companion/ember",
  abilityId: 164289,
  skillLineId: "temper-companion-skill-line/companion-ember-lightning-caller",
  skillType: "temper-skill-type/active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
