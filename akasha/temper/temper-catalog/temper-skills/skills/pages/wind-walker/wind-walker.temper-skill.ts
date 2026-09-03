import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const windWalker = {
  id: "019e6238-c32e-7b85-88bd-15ec37e502ae",
  pageTypeSlug: "temper-skill",
  slug: "wind-walker",
  title: "Wind Walker",
  key: "wind-walker",
  baseName: "Wind Walker",
  description:
    '"Increases your Stamina Recovery by 4% per piece of Medium Armor equipped. \\n\\nCurrent bonus: 0%.\\n\\nReduces the Stamina cost of your abilities by 2% per piece of Medium Armor equipped. \\n\\nCurrent bonus: 0%."',
  icon: "/esoui/art/icons/ability_armor_011.dds",
  esoSkillId: 45565,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 2,
  skillLineId: "armor-medium-armor",
  skillType: "passive",
  subcategoryId: "armor-medium-armor",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
