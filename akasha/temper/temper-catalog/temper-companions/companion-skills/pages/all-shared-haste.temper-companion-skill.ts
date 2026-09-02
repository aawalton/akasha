import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedHaste = {
  id: "01a05fd0-1d6d-7a86-bc23-2e76a93a28d6",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-haste",
  key: "shared-haste",
  title: "Haste",
  icon: "/esoui/art/icons/ability_companion_armor_light.dds",
  description:
    "Your Companion focuses their magical energies inward, resetting the cooldown of all their other abilities.",
  companionId: "all",
  abilityId: 156340,
  skillLineId: "armor-light",
  skillType: "active",
} as const satisfies TemperCompanionSkill
