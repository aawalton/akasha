import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedBulwark = {
  id: "01a05fd0-1d6b-7c41-99d3-f00ffeda79d6",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-bulwark",
  key: "shared-bulwark",
  title: "Bulwark",
  icon: "/esoui/art/icons/ability_companion_armor_heavy.dds",
  description:
    "Your Companion becomes an unstoppable defender, blocking and reflecting all attacks for $$1 seconds.",
  companionId: "all",
  abilityId: 156599,
  skillLineId: "armor-heavy",
  skillType: "active",
} as const satisfies TemperCompanionSkill
