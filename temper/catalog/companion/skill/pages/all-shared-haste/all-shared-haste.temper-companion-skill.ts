import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const allSharedHaste = {
  id: "019e6484-382e-745b-b03a-6268beb1740c",
  type: "page-type/temper-companion-skill",
  slug: "all-shared-haste",
  key: "shared-haste",
  title: "Haste",
  icon: "/esoui/art/icons/ability_companion_armor_light.dds",
  description:
    "Your Companion focuses their magical energies inward, resetting the cooldown of all their other abilities.",
  abilityId: 156340,
  skillLineId: "armor-light",
  skillType: "temper-skill-type/active",
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
