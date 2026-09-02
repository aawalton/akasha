import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const augur = {
  id: "01a05fd0-4354-7330-938e-c21f41b2bd0e",
  pageTypeSlug: "temper-skill",
  slug: "augur",
  title: "Augur",
  key: "augur",
  baseName: "Augur",
  description:
    '"Indicates how near the Antiquity is to the selected location. \\n\\nCan only be used a limited number of times, based on the Antiquity\'s Difficulty.\\n\\nWorks on the lowest six layers of dirt and rocks. Cannot detect Bonus Loot.\\n\\nUsing Augur does not consume a turn."',
  icon: "/esoui/art/icons/u26_ability_digging_04.dds",
  esoSkillId: 139905,
  isMorph: false,
  learnedLevel: 5,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-excavation",
  skillType: "passive",
  subcategoryId: "world-excavation",
} as const satisfies TemperSkill
