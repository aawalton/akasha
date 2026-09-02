import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const sharpAsNightSharpPetalsOfTheHunter = {
  id: "01a05fd0-1d83-7706-b960-e73ba47853b3",
  pageTypeSlug: "temper-companion-skill",
  slug: "sharp-as-night-sharp-petals-of-the-hunter",
  key: "sharp-petals-of-the-hunter",
  title: "Petals of the Hunter",
  icon: "/esoui/art/icons/ability_companion_warden_lotusflower.dds",
  description:
    "Your Companion calls on the essence of a carnivorous bloom, causing their Light Attacks to restore $1 Health to themselves or up to 2 nearby allies for $$1 seconds.",
  companionId: "sharp-as-night",
  abilityId: 186601,
  skillLineId: "companion-sharp-as-night-verdant-growth",
  skillType: "active",
  validRoles: ["healer", "tank"],
} as const satisfies TemperCompanionSkill
