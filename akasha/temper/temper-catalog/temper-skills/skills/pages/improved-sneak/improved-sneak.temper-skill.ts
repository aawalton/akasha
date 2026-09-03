import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const improvedSneak = {
  id: "019e6238-c2ca-7db7-aa23-2048d0350b65",
  pageTypeSlug: "temper-skill",
  slug: "improved-sneak",
  title: "Improved Sneak",
  key: "improved-sneak",
  baseName: "Improved Sneak",
  description:
    '"Reduces the cost of Sneak by 7% for each piece of Medium Armor equipped. \\n\\nCurrent bonus: 0%.\\n\\nReduces the size of your detection area while Sneaking by 5% for each piece of Medium Armor equipped. \\n\\nCurrent bonus: 0%."',
  icon: "/esoui/art/icons/ability_armor_007.dds",
  esoSkillId: 45567,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 2,
  skillLineId: "armor-medium-armor",
  skillType: "passive",
  subcategoryId: "armor-medium-armor",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
