import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const sharpAsNightSharpGore = {
  id: "019e6484-3897-76e3-a61f-4befd88be014",
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
