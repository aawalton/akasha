import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedFlow = {
  id: "019e6484-3830-7a11-bb1e-ef64c85fc414",
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
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
