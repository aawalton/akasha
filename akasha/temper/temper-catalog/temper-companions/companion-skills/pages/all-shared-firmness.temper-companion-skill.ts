import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedFirmness = {
  id: "019e6484-382a-7dbd-8802-313f8d8dcfbf",
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
