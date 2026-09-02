import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const mirriMirriShadowSlash = {
  id: "01a05fd0-1d81-7f0b-9fbe-7a273ea68d29",
  pageTypeSlug: "temper-companion-skill",
  slug: "mirri-mirri-shadow-slash",
  key: "mirri-shadow-slash",
  title: "Shadow Slash",
  icon: "/esoui/art/icons/ability_companion_nightblade_002.dds",
  description:
    "Your Companion slashes an enemy, dealing $1 Magic Damage and setting them Off Balance for $$2 seconds.",
  companionId: "mirri",
  abilityId: 156182,
  skillLineId: "companion-mirri-deadly-assassin",
  skillType: "active",
  validRoles: ["dps"],
} as const satisfies TemperCompanionSkill
