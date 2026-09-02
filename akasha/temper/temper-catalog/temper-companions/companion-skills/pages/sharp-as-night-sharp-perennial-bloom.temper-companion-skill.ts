import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const sharpAsNightSharpPerennialBloom = {
  id: "01a05fd0-1d83-7f10-8334-4a91cb50c577",
  pageTypeSlug: "temper-companion-skill",
  slug: "sharp-as-night-sharp-perennial-bloom",
  key: "sharp-perennial-bloom",
  title: "Perennial Bloom",
  icon: "/esoui/art/icons/ability_companion_warden_healingseed.dds",
  description:
    "Your Companion summons a field of blooming flowers, healing you and nearby allies for $1 Health every 2 seconds over $$1 seconds.",
  companionId: "sharp-as-night",
  abilityId: 186602,
  skillLineId: "companion-sharp-as-night-verdant-growth",
  skillType: "active",
  validRoles: ["healer"],
} as const satisfies TemperCompanionSkill
