import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const juggernaut = {
  id: "01a05fd0-dccb-7e36-a068-a49728448bdf",
  pageTypeSlug: "temper-skill",
  slug: "juggernaut",
  title: "Juggernaut",
  key: "juggernaut",
  baseName: "Juggernaut",
  description:
    '"Increases your Max Health by 2% for each piece of Heavy Armor equipped.  \\n\\nCurrent bonus: 0%."',
  icon: "/esoui/art/icons/ability_armor_012.dds",
  esoSkillId: 45546,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 2,
  skillLineId: "armor-heavy-armor",
  skillType: "passive",
  subcategoryId: "armor-heavy-armor",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
