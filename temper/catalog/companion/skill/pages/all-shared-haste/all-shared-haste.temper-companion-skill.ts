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
  skillLineId: "temper-companion-skill-line/armor-light",
  skillType: "temper-skill-type/active",
  skillEffects: "jsonl",
  createdAt: "2026-05-26T13:40:47.278Z",
  updatedAt: "2026-09-22T20:39:10.000Z",
} as const satisfies TemperCompanionSkill
