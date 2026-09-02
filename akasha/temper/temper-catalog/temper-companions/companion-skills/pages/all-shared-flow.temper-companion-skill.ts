import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedFlow = {
  id: "01a05fd0-1d6d-72ff-8428-2b0c0e0fb162",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-flow",
  key: "shared-flow",
  title: "Flow",
  icon: "/esoui/art/icons/passive_companion_armor_light.dds",
  description:
    "Increases healing done by 1% for each piece of Light Armor equipped. Decreases Break Free cooldown by 5% for each piece of Light Armor equipped.",
  companionId: "all",
  abilityId: 157728,
  skillLineId: "armor-light",
  skillType: "passive",
} as const satisfies TemperCompanionSkill
