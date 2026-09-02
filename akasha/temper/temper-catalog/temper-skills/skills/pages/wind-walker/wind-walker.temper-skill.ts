import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const windWalker = {
  id: "01a05fd2-1e98-7f19-a308-381ce505e7f2",
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
