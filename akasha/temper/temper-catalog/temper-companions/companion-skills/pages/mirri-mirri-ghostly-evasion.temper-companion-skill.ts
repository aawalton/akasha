import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const mirriMirriGhostlyEvasion = {
  id: "01a05fd0-1d80-7c6c-9a06-3086fcf303e1",
  pageTypeSlug: "temper-companion-skill",
  slug: "mirri-mirri-ghostly-evasion",
  key: "mirri-ghostly-evasion",
  title: "Ghostly Evasion",
  icon: "/esoui/art/icons/ability_companion_nightblade_009.dds",
  description:
    "Your Companion surrounds themselves in a phantasmic aura, dodging the next attack made against them while also reducing their damage taken by 20% for $$2 seconds.",
  companionId: "mirri",
  abilityId: 157197,
  skillLineId: "companion-mirri-living-shade",
  skillType: "active",
  validRoles: ["tank"],
} as const satisfies TemperCompanionSkill
