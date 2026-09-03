import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const mirriMirriMasqueOfTorment = {
  id: "019e6484-3888-7377-8e0b-1a7c9cd33def",
  pageTypeSlug: "temper-companion-skill",
  slug: "mirri-mirri-masque-of-torment",
  key: "mirri-masque-of-torment",
  title: "Masque of Torment",
  icon: "/esoui/art/icons/ability_companion_nightblade_016.dds",
  description:
    "Your Companion terrifies nearby enemies, causing them to cower in fear for $$1 seconds.",
  companionId: "mirri",
  abilityId: 153856,
  skillLineId: "companion-mirri-living-shade",
  skillType: "active",
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
