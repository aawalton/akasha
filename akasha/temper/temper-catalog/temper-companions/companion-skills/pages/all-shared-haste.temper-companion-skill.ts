import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedHaste = {
  id: "019e6484-382e-745b-b03a-6268beb1740c",
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
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
