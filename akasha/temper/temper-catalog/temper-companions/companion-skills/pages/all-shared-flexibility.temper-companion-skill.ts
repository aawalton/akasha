import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedFlexibility = {
  id: "01a05fd0-1d6d-729a-b5dd-b32716a38599",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-flexibility",
  key: "shared-flexibility",
  title: "Flexibility",
  icon: "/esoui/art/icons/passive_companion_armor_medium.dds",
  description:
    "Increases damage done by 1% for each piece of Medium Armor equipped. Decreases Roll Dodge cooldown by 5% for each piece of Medium Armor equipped.",
  companionId: "all",
  abilityId: 157729,
  skillLineId: "armor-medium",
  skillType: "passive",
} as const satisfies TemperCompanionSkill
