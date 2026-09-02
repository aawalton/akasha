import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const sharpAsNightSharpGore = {
  id: "01a05fd0-1d82-745c-8b11-24f70ad890a2",
  pageTypeSlug: "temper-companion-skill",
  slug: "sharp-as-night-sharp-gore",
  key: "sharp-gore",
  title: "Gore",
  icon: "/esoui/art/icons/ability_companion_warden_gore.dds",
  description:
    "Your Companion provokes a spectral kagouti to charge and toss the enemy for $1 Physical Damage, stunning them for $$2 seconds. This ability deals 150% more damage to enemies below 25% Health.",
  companionId: "sharp-as-night",
  abilityId: 186488,
  skillLineId: "companion-sharp-as-night",
  skillType: "ultimate",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
