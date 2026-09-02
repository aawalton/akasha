import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedFirmness = {
  id: "01a05fd0-1d6c-7d45-8a90-ece61adbbe15",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-firmness",
  key: "shared-firmness",
  title: "Firmness",
  icon: "/esoui/art/icons/passive_companion_armor_heavy.dds",
  description:
    "Increases healing received by 1% for each piece of Heavy Armor equipped. Increases damage blocked by 1% for each piece of Heavy Armor equipped.",
  companionId: "all",
  abilityId: 157730,
  skillLineId: "armor-heavy",
  skillType: "passive",
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
