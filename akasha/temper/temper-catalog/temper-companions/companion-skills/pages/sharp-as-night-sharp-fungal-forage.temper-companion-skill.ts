import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const sharpAsNightSharpFungalForage = {
  id: "01a05fd0-1d82-74c4-b856-a852e102b32a",
  pageTypeSlug: "temper-companion-skill",
  slug: "sharp-as-night-sharp-fungal-forage",
  key: "sharp-fungal-forage",
  title: "Fungal Forage",
  icon: "/esoui/art/icons/ability_companion_warden_fungalgrowth.dds",
  description:
    "Your Companion musters a cluster of mushrooms, healing you and your allies for $1 Health. Heals for 50% more on allies that are within 8 meters of Your Companion.",
  companionId: "sharp-as-night",
  abilityId: 186598,
  skillLineId: "companion-sharp-as-night-verdant-growth",
  skillType: "active",
  validRoles: ["healer"],
} as const satisfies TemperCompanionSkill
