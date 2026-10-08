import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const allSharedFlexibility = {
  id: "019e6484-3835-78f0-aac4-b3f011617cbb",
  type: "page-type/temper-companion-skill",
  slug: "all-shared-flexibility",
  key: "shared-flexibility",
  title: "Flexibility",
  icon: "/esoui/art/icons/passive_companion_armor_medium.dds",
  description:
    "Increases damage done by 1% for each piece of Medium Armor equipped. Decreases Roll Dodge cooldown by 5% for each piece of Medium Armor equipped.",
  abilityId: 157729,
  skillLineId: "temper-companion-skill-line/armor-medium",
  skillType: "temper-skill-type/passive",
  skillEffects: "jsonl",
  createdAt: "2026-05-26T13:40:47.285Z",
  updatedAt: "2026-09-22T20:39:10.000Z",
} as const satisfies TemperCompanionSkill
