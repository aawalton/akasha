import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const augur139904 = {
  id: "01a05fd0-4354-7b3c-804b-97f2795dd9ad",
  pageTypeSlug: "temper-skill",
  slug: "augur-139904",
  title: "Augur",
  key: "augur-139904",
  baseName: "Augur",
  description:
    '"Indicates how near the Antiquity is to the selected location. \\n\\nCan only be used a limited number of times, based on the Antiquity\'s Difficulty.\\n\\nOnly works on |cFFFFFFthe lowest three layers|r of dirt and rocks. Cannot detect Bonus Loot.\\n\\n|cFFFFFFUsing Augur does not consume a turn.|r"',
  icon: "/esoui/art/icons/u26_ability_digging_04.dds",
  esoSkillId: 139904,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-excavation",
  skillType: "passive",
  subcategoryId: "world-excavation",
} as const satisfies TemperSkill
