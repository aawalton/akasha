import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const darkStalker = {
  id: "01a05fd0-8dfc-7b17-a577-2a2b67218851",
  pageTypeSlug: "temper-skill",
  slug: "dark-stalker",
  title: "Dark Stalker",
  key: "dark-stalker",
  baseName: "Dark Stalker",
  description:
    '"Ignore the Movement Speed penalty of Sneak.\\n\\nDecreases the time it takes to enter Sneak by 50%."',
  icon: "/esoui/art/icons/passive_u26_vampire_01.dds",
  esoSkillId: 46041,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-vampire",
  skillType: "passive",
  subcategoryId: "world-vampire",
  effects: "jsonl",
} as const satisfies TemperSkill
