import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedBashingBulwark = {
  id: "01a05fd0-1d6b-760f-9d3f-b8a0e6ff00fe",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-bashing-bulwark",
  key: "shared-bashing-bulwark",
  title: "Bashing Bulwark",
  icon: "/esoui/art/icons/ability_companion_1handed_003.dds",
  description: "Your Companion rushes an enemy and rams them, stunning them for $$1 seconds.",
  companionId: "all",
  abilityId: 155326,
  skillLineId: "weapon-one-hand-shield",
  skillType: "active",
} as const satisfies TemperCompanionSkill
