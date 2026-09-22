import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const mirriMirriMasqueOfTorment = {
  id: "019e6484-3888-7377-8e0b-1a7c9cd33def",
  type: "page-type/temper-companion-skill",
  slug: "mirri-mirri-masque-of-torment",
  key: "mirri-masque-of-torment",
  title: "Masque of Torment",
  icon: "/esoui/art/icons/ability_companion_nightblade_016.dds",
  description:
    "Your Companion terrifies nearby enemies, causing them to cower in fear for $$1 seconds.",
  companionId: "mirri",
  abilityId: 153856,
  skillLineId: "companion-mirri-living-shade",
  skillType: "temper-skill-type/active",
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
