import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const mirriMirriMasqueOfTorment = {
  id: "01a05fd0-1d81-706f-901a-ee1b159b971c",
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
